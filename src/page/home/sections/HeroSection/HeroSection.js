import styles from './HeroSection.module.css';
import { useI18n } from '../../../../i18n';
import { ROUTE_SEGMENTS } from '../../../../i18n';
import { LocalizedNavLink } from '../../../../components/localized-link/LocalizedLink';

export const HeroSection = () => {
  const { t } = useI18n();
  const hero = t('home.hero');

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.kicker}>{hero.kicker}</p>
        <h1 className={styles.h1}>{hero.title}</h1>
        <p className={styles.lead}>{hero.lead}</p>

        <div className={styles.heroActions}>
          <LocalizedNavLink to={ROUTE_SEGMENTS.preOrder} className={`${styles.primaryButton} lux luxGold`}>
            {hero.cta}
          </LocalizedNavLink>
          <a href="https://wa.me/37068803122" target="_blank" rel="noreferrer" className={`${styles.secondaryButton} lux luxDark`}>
            {t('common.whatsapp')}
          </a>
          <a href="https://t.me/dkud13" target="_blank" rel="noreferrer" className={`${styles.secondaryButton} lux luxDark`}>
            {t('common.telegram')}
          </a>
        </div>

        <div className={styles.pills}>
          {hero.pills.map((pill) => <span key={pill} className={styles.pill}>{pill}</span>)}
        </div>

        <div className={styles.glassCard}>
          <div className={styles.glassHeader}>
            <span className={styles.glassTitle}>{hero.cardTitle}</span>
            <span className={styles.badge}>{hero.badge}</span>
          </div>
          <ul className={styles.bullets}>
            {hero.bullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};
