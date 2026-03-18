import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMemo, useRef, useState } from 'react';
import styles from './ContactsPage.module.css';
import { Toast } from '../../components/toast/Toast';
import { API_BASE } from '../../config/api';
import { Seo } from '../../components/seo/Seo';
import { ROUTE_SEGMENTS, useI18n } from '../../i18n';

const initialValues = { name: '', email: '', message: '', companyWebsite: '' };

export const ContactsPage = () => {
  const formRef = useRef(null);
  const emailRef = useRef(null);
  const [toast, setToast] = useState({ type: 'idle', message: '' });
  const { lang, t } = useI18n();

  const seo = t('seo.contacts');
  const page = t('contacts');

  const schema = useMemo(() => Yup.object({
    name: Yup.string().trim().min(2, t('validation.tooShort')).max(140, t('validation.tooLong')).required(t('validation.required')),
    email: Yup.string().trim().email(t('validation.invalidEmail')).required(t('validation.required')),
    message: Yup.string().trim().min(10, t('validation.tooShort')).max(3000, t('validation.tooLong')).required(t('validation.required')),
    companyWebsite: Yup.string().max(0, t('validation.invalid')),
  }), [t]);

  const showToast = (type, message) => setToast({ type, message });
  const clearToast = () => setToast({ type: 'idle', message: '' });
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => emailRef.current?.focus(), 350);
  };

  return (
    <main className={styles.page}>
      <Seo lang={lang} routePath={ROUTE_SEGMENTS.contacts} title={seo.title} description={seo.description} />

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>{page.hero.kicker}</p>
          <h1 className={styles.h1}>{page.hero.title}</h1>
          <p className={styles.lead}>{page.hero.lead}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.primaryStrip}>
            <div className={styles.primaryLeft}>
              <div className={styles.primaryTitle}>{page.primary.title}</div>
              <div className={styles.primaryMeta}>
                <div className={styles.metaRow}><span className={styles.metaLabel}>{t('common.phone')}</span><a className={styles.metaValuePlain} href="tel:+37068803122">+370 688 03122</a></div>
                <div className={styles.metaRow}><span className={styles.metaLabel}>{t('common.email')}</span><a className={styles.metaValuePlain} href="mailto:uabkubauto@gmail.com">uabkubauto@gmail.com</a></div>
                <div className={styles.metaRow}><span className={styles.metaLabel}>{t('common.availability')}</span><span className={styles.metaValueText}>24/7</span></div>
              </div>
            </div>

            <div className={styles.primaryActions}>
              <a className={`${styles.actionBtnBig} lux luxGold`} href="https://wa.me/37068803122" target="_blank" rel="noreferrer">{t('common.whatsapp')}</a>
              <button type="button" className={`${styles.actionBtnBig} lux luxDark`} onClick={scrollToForm}>{page.primary.emailUs}</button>
              <a className={styles.tertiaryLink} href="https://t.me/dkud13" target="_blank" rel="noreferrer">{page.primary.telegramCta}</a>
            </div>
          </div>

          <div className={styles.split}>
            <div className={styles.officeCard}>
              <div className={styles.officeHead}>
                <div>
                  <div className={styles.cardLabel}>{page.office.label}</div>
                  <div className={styles.officeValue}>{page.office.address}</div>
                </div>
                <div className={styles.badge}>{page.office.badge}</div>
              </div>

              <div className={styles.officeMeta}>
                <div className={styles.metaItem}><div className={styles.metaLabelSmall}>{page.office.hoursLabel}</div><div className={styles.metaValueSmall}>{page.office.hoursValue}</div></div>
                <div className={styles.metaItem}><div className={styles.metaLabelSmall}>{page.office.supportLabel}</div><div className={styles.metaValueSmall}>{page.office.supportValue}</div></div>
                <div className={styles.metaItem}><div className={styles.metaLabelSmall}>{page.office.preOrderLabel}</div><div className={styles.metaValueSmall}>{page.office.preOrderValue}</div></div>
              </div>

              <div className={styles.officeActions}>
                <a className={`${styles.actionBtn} lux luxGold`} href="https://www.google.com/maps/search/?api=1&query=Dz%C5%ABk%C5%B3%20g.%206a%2C%20Vilnius" target="_blank" rel="noreferrer">{page.office.openMaps}</a>
              </div>

              <div className={styles.mapFrame}>
                <iframe title={page.office.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Dz%C5%ABk%C5%B3%20g.%206a%2C%20Vilnius&output=embed" />
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.cardHead}>
                <h2 className={styles.h2}>{page.form.title}</h2>
                <p className={styles.sub}>{page.form.sub}</p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur
                onSubmit={async (values, helpers) => {
                  try {
                    const res = await fetch(`${API_BASE}/api/contact`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(values),
                    });

                    if (!res.ok) {
                      const text = await res.text().catch(() => '');
                      throw new Error(text || `Request failed (${res.status})`);
                    }

                    showToast('success', page.form.success);
                    helpers.resetForm({ values: initialValues });
                  } catch (e) {
                    const msg = e instanceof Error ? e.message : t('validation.unknownError');
                    showToast('error', `${page.form.error} ${msg}`);
                  } finally {
                    helpers.setSubmitting(false);
                  }
                }}
              >
                {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                  <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                    <input type="text" name="companyWebsite" value={values.companyWebsite} onChange={handleChange} onBlur={handleBlur} autoComplete="off" tabIndex={-1} className={styles.honeypot} />
                    <Field label={page.form.nameLabel} name="name" value={values.name} error={touched.name ? errors.name : ''} onChange={handleChange} onBlur={handleBlur} placeholder={page.form.namePlaceholder} />
                    <Field label={page.form.emailLabel} name="email" value={values.email} error={touched.email ? errors.email : ''} onChange={handleChange} onBlur={handleBlur} placeholder={page.form.emailPlaceholder} type="email" inputRef={emailRef} />
                    <TextAreaField label={page.form.messageLabel} name="message" value={values.message} error={touched.message ? errors.message : ''} onChange={handleChange} onBlur={handleBlur} placeholder={page.form.messagePlaceholder} />
                    <div className={styles.formActions}>
                      <button type="submit" className={`${styles.submitBtn} lux luxGold`} disabled={isSubmitting}>{isSubmitting ? t('common.sending') : page.form.submit}</button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>

      <Toast type={toast.type} message={toast.message} onClose={clearToast} autoHideMs={toast.type === 'idle' ? 0 : 4500} />
    </main>
  );
};

const Field = ({ label, name, value, error, placeholder, type = 'text', onChange, onBlur, inputRef }) => {
  const hasError = Boolean(error);
  return (
    <label className={styles.field}>
      <span className={styles.labelRow}><span className={styles.label}>{label}</span>{hasError && <span className={styles.error}>{error}</span>}</span>
      <input ref={inputRef} className={`${styles.input} ${hasError ? styles.inputError : ''}`} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} type={type} />
    </label>
  );
};

const TextAreaField = ({ label, name, value, error, placeholder, onChange, onBlur }) => {
  const hasError = Boolean(error);
  return (
    <label className={styles.field}>
      <span className={styles.labelRow}><span className={styles.label}>{label}</span>{hasError && <span className={styles.error}>{error}</span>}</span>
      <textarea className={`${styles.textarea} ${hasError ? styles.inputError : ''}`} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} rows={5} />
    </label>
  );
};
