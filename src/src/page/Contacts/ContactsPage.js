import { Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import styles from "./ContactsPage.module.css";
import { Toast } from "../../components/toast/Toast";
import {API_BASE} from "../../config/api";

const schema = Yup.object({
    name: Yup.string().trim().min(2, "Too short").max(140, "Too long").required("Required"),
    email: Yup.string().trim().email("Invalid email").required("Required"),
    message: Yup.string().trim().min(10, "Too short").max(3000, "Too long").required("Required"),
    companyWebsite: Yup.string().max(0, "Invalid"), // honeypot must stay empty
});

const initialValues = {
    name: "",
    email: "",
    message: "",
    companyWebsite: "",
};

export const ContactsPage = () => {
    const formRef = useRef(null);
    const emailRef = useRef(null);

    const [toast, setToast] = useState({ type: "idle", message: "" });

    const showToast = (type, message) => setToast({ type, message });
    const clearToast = () => setToast({ type: "idle", message: "" });

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => emailRef.current?.focus(), 350);
    };

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <p className={styles.kicker}>CONTACTS</p>
                    <h1 className={styles.h1}>Get in touch</h1>
                    <p className={styles.lead}>
                        Fastest way: WhatsApp. We’re available 24/7 for consultation and pre-order requests.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    {/* Primary contact strip */}
                    <div className={styles.primaryStrip}>
                        <div className={styles.primaryLeft}>
                            <div className={styles.primaryTitle}>KUB AUTO Concierge</div>

                            <div className={styles.primaryMeta}>
                                <div className={styles.metaRow}>
                                    <span className={styles.metaLabel}>Phone</span>
                                    <a className={styles.metaValuePlain} href="tel:+37068803122">
                                        +370 688 03122
                                    </a>
                                </div>

                                <div className={styles.metaRow}>
                                    <span className={styles.metaLabel}>Email</span>
                                    <a className={styles.metaValuePlain} href="mailto:uabkubauto@gmail.com">
                                        uabkubauto@gmail.com
                                    </a>
                                </div>

                                <div className={styles.metaRow}>
                                    <span className={styles.metaLabel}>Availability</span>
                                    <span className={styles.metaValueText}>24/7</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.primaryActions}>
                            <a
                                className={`${styles.actionBtnBig} lux luxGold`}
                                href="https://wa.me/37068803122"
                                target="_blank"
                                rel="noreferrer"
                            >
                                WhatsApp
                            </a>

                            <button
                                type="button"
                                className={`${styles.actionBtnBig} lux luxDark`}
                                onClick={scrollToForm}
                            >
                                Email us
                            </button>

                            <a
                                className={styles.tertiaryLink}
                                href="https://t.me/kolyakolya12"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Prefer Telegram? Open chat →
                            </a>
                        </div>
                    </div>

                    {/* Office + Map + Form */}
                    <div className={styles.split}>
                        {/* Office */}
                        <div className={styles.officeCard}>
                            <div className={styles.officeHead}>
                                <div>
                                    <div className={styles.cardLabel}>Office address</div>
                                    <div className={styles.officeValue}>
                                        Dzūkų g. 6a, Vilnius, 02163 Vilniaus m. sav.
                                    </div>
                                </div>

                                <div className={styles.badge}>24/7</div>
                            </div>

                            <div className={styles.officeMeta}>
                                <div className={styles.metaItem}>
                                    <div className={styles.metaLabelSmall}>Working hours</div>
                                    <div className={styles.metaValueSmall}>24/7</div>
                                </div>
                                <div className={styles.metaItem}>
                                    <div className={styles.metaLabelSmall}>Support</div>
                                    <div className={styles.metaValueSmall}>WhatsApp / Email</div>
                                </div>
                                <div className={styles.metaItem}>
                                    <div className={styles.metaLabelSmall}>Pre-order</div>
                                    <div className={styles.metaValueSmall}>Contract-based process</div>
                                </div>
                            </div>

                            <div className={styles.officeActions}>
                                <a
                                    className={`${styles.actionBtn} lux luxGold`}
                                    href="https://www.google.com/maps/search/?api=1&query=Dz%C5%ABk%C5%B3%20g.%206a%2C%20Vilnius"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open in Google Maps
                                </a>
                            </div>

                            <div className={styles.mapFrame}>
                                <iframe
                                    title="KUB AUTO office map"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps?q=Dz%C5%ABk%C5%B3%20g.%206a%2C%20Vilnius&output=embed"
                                />
                            </div>
                        </div>

                        {/* Form */}
                        <div className={styles.formCard}>
                            <div className={styles.cardHead}>
                                <h2 className={styles.h2}>Quick message</h2>
                                <p className={styles.sub}>
                                    Leave a short note — we’ll reply as soon as possible.
                                </p>
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={schema}
                                validateOnChange={false}
                                validateOnBlur={true}
                                onSubmit={async (values, helpers) => {
                                    try {
                                        const res = await fetch(`${API_BASE}/api/contact`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(values),
                                        });

                                        if (!res.ok) {
                                            const text = await res.text().catch(() => "");
                                            throw new Error(text || `Request failed (${res.status})`);
                                        }

                                        showToast(
                                            "success",
                                            "Message sent successfully. We’ll get back to you soon."
                                        );

                                        helpers.resetForm({ values: initialValues });
                                    } catch (e) {
                                        const msg = e instanceof Error ? e.message : "Unknown error";
                                        showToast("error", `Failed to send message. ${msg}`);
                                    } finally {
                                        helpers.setSubmitting(false);
                                    }
                                }}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      isSubmitting,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                  }) => (
                                    <form
                                        ref={formRef}
                                        className={styles.contactForm}
                                        onSubmit={handleSubmit}
                                        noValidate
                                    >
                                        {/* honeypot */}
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

                                        <Field
                                            label="Your name"
                                            name="name"
                                            value={values.name}
                                            error={touched.name ? errors.name : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Full name"
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
                                            inputRef={emailRef}
                                        />

                                        <TextAreaField
                                            label="Message"
                                            name="message"
                                            value={values.message}
                                            error={touched.message ? errors.message : ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="What car are you looking for? Budget, year, mileage, preferences..."
                                            rows={5}
                                        />

                                        <div className={styles.formActions}>
                                            <button
                                                type="submit"
                                                className={`${styles.submitBtn} lux luxGold`}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Sending..." : "Send message"}
                                            </button>

                                            <a className={`${styles.altBtn} lux luxDark`} href="/pre-order">
                                                Go to Pre-Order
                                            </a>
                                        </div>

                                        <div className={styles.formNote}>
                                            Urgent? Message on{" "}
                                            <a
                                                className={styles.inlineLink}
                                                href="https://wa.me/37068803122"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                WhatsApp
                                            </a>
                                            .
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
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

const Field = ({ label, name, value, error, placeholder, type = "text", onChange, onBlur, inputRef }) => {
    const hasError = Boolean(error);
    return (
        <label className={styles.field}>
            <span className={styles.labelRow}>
                <span className={styles.label}>{label}</span>
                {hasError && <span className={styles.error}>{error}</span>}
            </span>

            <input
                ref={inputRef}
                className={`${styles.input} ${hasError ? styles.inputError : ""}`}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                type={type}
            />
        </label>
    );
};

const TextAreaField = ({ label, name, value, error, placeholder, rows = 5, onChange, onBlur }) => {
    const hasError = Boolean(error);
    return (
        <label className={styles.field}>
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
                rows={rows}
            />
        </label>
    );
};