import { useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './PreOrderPage.module.css';
import { Toast } from '../../components/toast/Toast';
import { SelectDropdown } from '../../components/selectDropdown/SelectDropdown';
import { API_BASE } from '../../config/api';
import { Seo } from '../../components/seo/Seo';
import { ROUTE_SEGMENTS, useI18n } from '../../i18n';

const normalizePhone = (v) => String(v ?? '').trim().replace(/[()\s-]/g, '');
const E164_REGEX = /^\+?[1-9]\d{7,14}$/;

const initialValues = {
  make: '',
  model: '',
  year: '',
  mileage: '',
  fuelType: '',
  bodyType: '',
  preferences: '',
  buyerType: '',
  buyerName: '',
  address: '',
  phone: '',
  email: '',
  companyWebsite: '',
};

export const PreOrderPage = () => {
  const [toast, setToast] = useState({ type: 'idle', message: '' });
  const { lang, t } = useI18n();

  const seo = t('seo.preOrder');
  const page = t('preOrder');

  const fuelOptions = useMemo(
      () =>
          (page.vehicle.fuelOptions || []).map((option) => ({
            value: option.value,
            label: option.label,
          })),
      [page]
  );

  const bodyOptions = useMemo(
      () =>
          (page.vehicle.bodyOptions || []).map((option) => ({
            value: option.value,
            label: option.label,
          })),
      [page]
  );

  const buyerTypeOptions = useMemo(
      () =>
          (page.buyer.buyerTypeOptions || []).map((option) => ({
            value: option.value,
            label: option.label,
          })),
      [page]
  );

  const schema = useMemo(
      () =>
          Yup.object({
            make: Yup.string().trim().required(page.validation.required),
            model: Yup.string().trim().required(page.validation.required),
            year: Yup.string()
                .trim()
                .matches(/^\d{4}$/, page.validation.yearFormat)
                .required(page.validation.required),
            mileage: Yup.string()
                .trim()
                .matches(/^\d+$/, page.validation.numbersOnly)
                .required(page.validation.required),
            fuelType: Yup.string().required(page.validation.required),
            bodyType: Yup.string().required(page.validation.required),
            preferences: Yup.string().trim().max(1200, page.validation.tooLong),
            buyerType: Yup.string().required(page.validation.required),
            buyerName: Yup.string().trim().required(page.validation.required),
            address: Yup.string().trim().required(page.validation.required),
            phone: Yup.string()
                .transform((v) => normalizePhone(v))
                .matches(E164_REGEX, page.validation.invalidPhone)
                .required(page.validation.required),
            email: Yup.string()
                .trim()
                .email(page.validation.invalidEmail)
                .required(page.validation.required),
            companyWebsite: Yup.string().max(0, page.validation.invalid),
          }),
      [page]
  );

  const showToast = (type, message) => setToast({ type, message });
  const clearToast = () => setToast({ type: 'idle', message: '' });

  return (
      <main className={styles.page}>
        <Seo
            lang={lang}
            routePath={ROUTE_SEGMENTS.preOrder}
            title={seo.title}
            description={seo.description}
        />

        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.kicker}>{page.hero.kicker}</p>
            <h1 className={styles.h1}>{page.hero.title}</h1>
            <p className={styles.lead}>{page.hero.lead}</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur
                onSubmit={async (values, helpers) => {
                  try {
                    const payload = {
                      ...values,
                      phone: normalizePhone(values.phone),
                    };

                    const res = await fetch(`${API_BASE}/api/preorder`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    });

                    if (!res.ok) {
                      const text = await res.text().catch(() => '');
                      throw new Error(text || `Request failed (${res.status})`);
                    }

                    showToast('success', page.buyer.success);
                    helpers.resetForm({ values: initialValues });
                  } catch (e) {
                    const msg = e instanceof Error ? e.message : t('validation.unknownError');
                    showToast('error', `${page.buyer.error} ${msg}`);
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

                    <div className={styles.card}>
                      <div className={styles.cardHead}>
                        <h2 className={styles.h2}>{page.vehicle.title}</h2>
                        <p className={styles.sub}>{page.vehicle.sub}</p>
                      </div>

                      <div className={styles.grid2}>
                        <Field
                            label={page.vehicle.make}
                            name="make"
                            value={values.make}
                            error={touched.make ? errors.make : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={page.vehicle.makePlaceholder}
                        />

                        <Field
                            label={page.vehicle.model}
                            name="model"
                            value={values.model}
                            error={touched.model ? errors.model : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={page.vehicle.modelPlaceholder}
                        />

                        <Field
                            label={page.vehicle.year}
                            name="year"
                            value={values.year}
                            error={touched.year ? errors.year : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={page.vehicle.yearPlaceholder}
                            inputMode="numeric"
                        />

                        <Field
                            label={page.vehicle.mileage}
                            name="mileage"
                            value={values.mileage}
                            error={touched.mileage ? errors.mileage : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={page.vehicle.mileagePlaceholder}
                            inputMode="numeric"
                        />

                        <SelectDropdown
                            label={page.vehicle.fuelType}
                            name="fuelType"
                            value={values.fuelType}
                            error={touched.fuelType ? errors.fuelType : ''}
                            placeholder={t('common.select')}
                            options={fuelOptions}
                            onChange={setFieldValue}
                        />

                        <SelectDropdown
                            label={page.vehicle.bodyType}
                            name="bodyType"
                            value={values.bodyType}
                            error={touched.bodyType ? errors.bodyType : ''}
                            placeholder={t('common.select')}
                            options={bodyOptions}
                            onChange={setFieldValue}
                        />
                      </div>

                      <TextAreaField
                          label={page.vehicle.preferences}
                          name="preferences"
                          value={values.preferences}
                          error={touched.preferences ? errors.preferences : ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={page.vehicle.preferencesPlaceholder}
                      />
                    </div>

                    <div className={styles.card}>
                      <div className={styles.cardHead}>
                        <h2 className={styles.h2}>{page.buyer.title}</h2>
                        <p className={styles.sub}>{page.buyer.sub}</p>
                      </div>

                      <div className={styles.grid2}>
                        <SelectDropdown
                            label={page.buyer.buyerType}
                            name="buyerType"
                            value={values.buyerType}
                            error={touched.buyerType ? errors.buyerType : ''}
                            placeholder={t('common.select')}
                            options={buyerTypeOptions}
                            onChange={setFieldValue}
                        />

                        <Field
                            label={page.buyer.buyerName}
                            name="buyerName"
                            value={values.buyerName}
                            error={touched.buyerName ? errors.buyerName : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={page.buyer.buyerNamePlaceholder}
                        />

                        <Field
                            label={page.buyer.address}
                            name="address"
                            value={values.address}
                            error={touched.address ? errors.address : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={page.buyer.addressPlaceholder}
                        />

                        <Field
                            label={page.buyer.phone}
                            name="phone"
                            value={values.phone}
                            error={touched.phone ? errors.phone : ''}
                            onChange={handleChange}
                            onBlur={(e) => {
                              handleBlur(e);
                              const cleaned = normalizePhone(values.phone);
                              if (cleaned !== values.phone) {
                                setFieldValue('phone', cleaned);
                              }
                            }}
                            placeholder={page.buyer.phonePlaceholder}
                            inputMode="tel"
                        />

                        <Field
                            label={page.buyer.email}
                            name="email"
                            value={values.email}
                            error={touched.email ? errors.email : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={page.buyer.emailPlaceholder}
                            type="email"
                        />
                      </div>

                      <div className={styles.actions}>
                        <button
                            type="submit"
                            className={`${styles.submit} lux luxGold`}
                            disabled={isSubmitting}
                        >
                          {isSubmitting ? t('common.sending') : page.buyer.submit}
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
                          {t('common.clearForm')}
                        </button>

                        <a
                            className={`${styles.altAction} lux luxDark`}
                            href="https://wa.me/37068803122"
                            target="_blank"
                            rel="noreferrer"
                        >
                          {page.buyer.askWhatsapp}
                        </a>

                        <a
                            className={`${styles.altAction} lux luxDark`}
                            href="https://t.me/dkud13"
                            target="_blank"
                            rel="noreferrer"
                        >
                          {page.buyer.askTelegram}
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
            autoHideMs={toast.type === 'idle' ? 0 : 4500}
        />
      </main>
  );
};

const Field = ({
                 label,
                 name,
                 value,
                 error,
                 placeholder,
                 type = 'text',
                 inputMode,
                 onChange,
                 onBlur,
               }) => {
  const hasError = Boolean(error);

  return (
      <label className={styles.field}>
      <span className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {hasError ? <span className={styles.error}>{error}</span> : null}
      </span>

        <input
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
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

const TextAreaField = ({
                         label,
                         name,
                         value,
                         error,
                         placeholder,
                         onChange,
                         onBlur,
                       }) => {
  const hasError = Boolean(error);

  return (
      <label className={styles.fieldFull}>
      <span className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {hasError ? <span className={styles.error}>{error}</span> : null}
      </span>

        <textarea
            className={`${styles.textarea} ${hasError ? styles.inputError : ''}`}
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