import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./PreOrderPage.module.css";
import { Toast } from "../../components/toast/Toast";
import {SelectDropdown} from "../../components/selectDropdown/SelectDropdown";
import {API_BASE} from "../../config/api";

const normalizePhone = (v) => {
    const s = String(v ?? "").trim();
    return s.replace(/[()\s-]/g, "");
};

// E.164: optional +, first digit 1-9, total 8..15 digits (excluding +)
const E164_REGEX = /^\+?[1-9]\d{7,14}$/;

const schema = Yup.object({
    make: Yup.string().trim().required("Required"),
    model: Yup.string().trim().required("Required"),
    year: Yup.string()
        .trim()
        .matches(/^\d{4}$/, "Use 4 digits (e.g. 2020)")
        .required("Required"),
    mileage: Yup.string().trim().matches(/^\d+$/, "Numbers only").required("Required"),
    fuelType: Yup.string().required("Required"),
    bodyType: Yup.string().required("Required"),
    preferences: Yup.string().trim().max(1200, "Too long"),

    buyerType: Yup.string().required("Required"),
    buyerName: Yup.string().trim().required("Required"),
    address: Yup.string().trim().required("Required"),

    phone: Yup.string()
        .transform((v) => normalizePhone(v))
        .matches(E164_REGEX, "Use international format, e.g. +37068803122")
        .required("Required"),

    email: Yup.string().trim().email("Invalid email").required("Required"),

    // honeypot: must be empty
    companyWebsite: Yup.string().max(0, "Invalid"),
});

const initialValues = {
    make: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    bodyType: "",
    preferences: "",

    buyerType: "",
    buyerName: "",
    address: "",
    phone: "",
    email: "",

    companyWebsite: "",
};

export const PreOrderPage = () => {
    const [toast, setToast] = useState({ type: "idle", message: "" });

    const showToast = (type, message) => setToast({ type, message });
    const clearToast = () => setToast({ type: "idle", message: "" });

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <p className={styles.kicker}>PRE-ORDER FORM</p>
                    <h1 className={styles.h1}>Submit vehicle requirements</h1>
                    <p className={styles.lead}>
                        We’ll review your request and respond with verified options and clear terms.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        validateOnChange={false}
                        validateOnBlur={true}
                        onSubmit={async (values, helpers) => {
                            try {
                                const payload = {
                                    ...values,
                                    phone: normalizePhone(values.phone),
                                };

                                const res = await fetch(`${API_BASE}/api/preorder`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payload),
                                });

                                if (!res.ok) {
                                    const text = await res.text().catch(() => "");
                                    throw new Error(text || `Request failed (${res.status})`);
                                }

                                showToast("success", "Request sent successfully. We’ll contact you shortly.");

                                helpers.resetForm({ values: initialValues });
                            } catch (e) {
                                const msg = e instanceof Error ? e.message : "Unknown error";
                                showToast("error", `Failed to send request. ${msg}`);
                            } finally {
                                helpers.setSubmitting(false);
                            }
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              resetForm,
                              setFieldValue,
                          }) => (
                            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                                {/* Honeypot field (hidden) */}
                                <input
                                    type="text"
                                    name="companyWebsite"
                                    value={values.companyWebsite}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="off"
                                    tabIndex={-1}
                                    className={styles.honeypot}
                                />

                                {/* Vehicle */}
                                <div className={styles.card}>
                                    <div className={styles.cardHead}>
                                        <h2 className={styles.h2}>Vehicle details</h2>
                                        <p className={styles.sub}>Core parameters to start selection.</p>
                                    </div>

                                    <div className={styles.grid2}>
                                        <Field
                                            label="Make"
                                            name="make"
                                            value={values.make}
                                            error={touched.make ? errors.make : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="e.g. BMW"
                                        />
                                        <Field
                                            label="Model"
                                            name="model"
                                            value={values.model}
                                            error={touched.model ? errors.model : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="e.g. X5"
                                        />
                                        <Field
                                            label="Year"
                                            name="year"
                                            value={values.year}
                                            error={touched.year ? errors.year : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="e.g. 2020"
                                            inputMode="numeric"
                                        />
                                        <Field
                                            label="Mileage (km)"
                                            name="mileage"
                                            value={values.mileage}
                                            error={touched.mileage ? errors.mileage : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="e.g. 45000"
                                            inputMode="numeric"
                                        />

                                        <SelectDropdown
                                            label="Fuel type"
                                            name="fuelType"
                                            value={values.fuelType}
                                            error={touched.fuelType ? errors.fuelType : ""}
                                            placeholder="Select"
                                            options={["Petrol", "Diesel", "Hybrid", "Electric"]}
                                            onChange={setFieldValue}
                                        />
                                        <SelectDropdown
                                            label="Body type"
                                            name="bodyType"
                                            value={values.bodyType}
                                            error={touched.bodyType ? errors.bodyType : ""}
                                            placeholder="Select"
                                            options={["Sedan", "Wagon", "Coupe", "SUV", "Hatchback", "Other"]}
                                            onChange={setFieldValue}
                                        />
                                    </div>

                                    <TextAreaField
                                        label="Additional preferences"
                                        name="preferences"
                                        value={values.preferences}
                                        error={touched.preferences ? errors.preferences : ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Trim, color, interior, condition, usage history, special requirements..."
                                    />
                                </div>

                                {/* Buyer */}
                                <div className={styles.card}>
                                    <div className={styles.cardHead}>
                                        <h2 className={styles.h2}>Buyer information</h2>
                                        <p className={styles.sub}>For contract and communication.</p>
                                    </div>

                                    <div className={styles.grid2}>
                                        <SelectDropdown
                                            label="Buyer type"
                                            name="buyerType"
                                            value={values.buyerType}
                                            error={touched.buyerType ? errors.buyerType : ""}
                                            placeholder="Select"
                                            options={["Individual", "Company"]}
                                            onChange={setFieldValue}
                                        />

                                        <Field
                                            label="Name / Company"
                                            name="buyerName"
                                            value={values.buyerName}
                                            error={touched.buyerName ? errors.buyerName : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Full name or legal entity"
                                        />

                                        <Field
                                            label="Address"
                                            name="address"
                                            value={values.address}
                                            error={touched.address ? errors.address : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Street, city, country"
                                        />

                                        <Field
                                            label="Phone"
                                            name="phone"
                                            value={values.phone}
                                            error={touched.phone ? errors.phone : ""}
                                            onChange={handleChange}
                                            onBlur={(e) => {
                                                handleBlur(e);
                                                const cleaned = normalizePhone(values.phone);
                                                if (cleaned !== values.phone) setFieldValue("phone", cleaned);
                                            }}
                                            placeholder="+370 688 03122"
                                            inputMode="tel"
                                        />

                                        <Field
                                            label="Email"
                                            name="email"
                                            value={values.email}
                                            error={touched.email ? errors.email : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="name@example.com"
                                            type="email"
                                        />
                                    </div>

                                    <div className={styles.actions}>
                                        <button
                                            type="submit"
                                            className={`${styles.submit} lux luxGold`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Sending..." : "Submit request"}
                                        </button>

                                        <button
                                            type="button"
                                            className={`${styles.altActionBtn} lux luxDark`}
                                            onClick={() => {
                                                resetForm({ values: initialValues });
                                                clearToast();
                                            }}
                                            disabled={isSubmitting}
                                        >
                                            Clear form
                                        </button>

                                        <a
                                            className={`${styles.altAction} lux luxDark`}
                                            href="https://wa.me/37068803122"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Ask on WhatsApp
                                        </a>

                                        <a
                                            className={`${styles.altAction} lux luxDark`}
                                            href="https://t.me/kolyakolya12"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Ask on Telegram
                                        </a>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </section>

            <Toast
                type={toast.type}
                message={toast.message}
                onClose={clearToast}
                autoHideMs={toast.type === "idle" ? 0 : 4500}
            />
        </main>
    );
};

const Field = ({ label, name, value, error, placeholder, type = "text", inputMode, onChange, onBlur }) => {
    const hasError = Boolean(error);
    return (
        <label className={styles.field}>
            <span className={styles.labelRow}>
                <span className={styles.label}>{label}</span>
                {hasError && <span className={styles.error}>{error}</span>}
            </span>

            <input
                className={`${styles.input} ${hasError ? styles.inputError : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                type={type}
                inputMode={inputMode}
            />
        </label>
    );
};


const TextAreaField = ({ label, name, value, error, placeholder, onChange, onBlur }) => {
    const hasError = Boolean(error);
    return (
        <label className={styles.fieldFull}>
            <span className={styles.labelRow}>
                <span className={styles.label}>{label}</span>
                {hasError && <span className={styles.error}>{error}</span>}
            </span>

            <textarea
                className={`${styles.textarea} ${hasError ? styles.inputError : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                rows={5}
            />
        </label>
    );
};