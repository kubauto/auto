import styles from './FinalCtaSection.module.css';
import { ROUTE_SEGMENTS, useI18n } from '../../../../i18n';
import { LocalizedNavLink } from '../../../../components/localized-link/LocalizedLink';

export const FinalCtaSection = () => {
  const { t } = useI18n();
  const section = t('home.finalCta');

  return (
    <section className={styles.finalCta}>
      <div className={styles.container}>
        <p className={styles.kickerGold}>{section.kicker}</p>
        <h2 className={styles.h2OnDark}>{section.title}</h2>
        <p className={styles.subOnDark}>{section.sub}</p>

        <div className={styles.finalActions}>
          <LocalizedNavLink to={ROUTE_SEGMENTS.preOrder} className={`${styles.primaryButton} lux luxGold`}>
            {section.cta}
          </LocalizedNavLink>
          <a href="https://wa.me/37068803122" target="_blank" rel="noreferrer" className={`${styles.secondaryButton} lux luxDark`}>
            {t('common.whatsapp')}
          </a>
          <a href="https://t.me/dkud13" target="_blank" rel="noreferrer" className={`${styles.secondaryButton} lux luxDark`}>
            {t('common.telegram')}
          </a>
        </div>

        <div className={styles.contactStrip}>
          <div><div className={styles.contactLabel}>{t('common.phone')}</div><div className={styles.contactValue}>+370 688 03122</div></div>
          <div><div className={styles.contactLabel}>{t('common.email')}</div><div className={styles.contactValue}>uabkubauto@gmail.com</div></div>
          <div><div className={styles.contactLabel}>{t('common.office')}</div><div className={styles.contactValueSmall}>Dzūkų g. 6a, Vilnius</div></div>
        </div>
      </div>
    </section>
  );
};
