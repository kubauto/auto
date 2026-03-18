import { Fragment } from 'react';
import styles from './ProcessSection.module.css';
import { useI18n, ROUTE_SEGMENTS } from '../../../../i18n';
import { LocalizedNavLink } from '../../../../components/localized-link/LocalizedLink';

export const ProcessSection = () => {
  const { t } = useI18n();
  const section = t('home.process');

  return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>{section.title}</h2>
            <p className={styles.sub}>{section.sub}</p>
          </div>

          <div className={styles.processCard}>
            <div className={styles.processSteps}>
              {section.steps.map((step, index) => (
                  <Fragment key={step.title}>
                    <div className={styles.step}>
                      <div className={index < 3 ? styles.stepDotActive : styles.stepDot} />
                      <div className={styles.stepTitle}>{step.title}</div>
                      <div className={styles.stepSub}>{step.sub}</div>
                    </div>

                    {index < section.steps.length - 1 && (
                        <div className={styles.stepLine} />
                    )}
                  </Fragment>
              ))}
            </div>
          </div>

          <div className={styles.ctaBar}>
            <div>
              <div className={styles.ctaTitle}>{section.ctaTitle}</div>
              <div className={styles.ctaText}>{section.ctaText}</div>
            </div>

            <LocalizedNavLink
                to={ROUTE_SEGMENTS.preOrder}
                className={`${styles.primaryButtonDark} lux luxGold`}
            >
              {section.cta}
            </LocalizedNavLink>
          </div>
        </div>
      </section>
  );
};