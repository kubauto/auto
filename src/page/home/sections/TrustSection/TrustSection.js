import styles from './TrustSection.module.css';
import { useI18n } from '../../../../i18n';

export const TrustSection = () => {
  const { t } = useI18n();
  const section = t('home.trust');

  return (
    <section className={styles.sectionAlt}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>{section.title}</h2>
          <p className={styles.sub}>{section.sub}</p>
        </div>

        <div className={styles.grid3}>
          {section.cards.map((card) => (
            <div key={card.title} className={styles.card}>
              <h3 className={styles.h3}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
              <div className={styles.goldBar} />
            </div>
          ))}
        </div>

        <div className={styles.missionStrip}>
          <div>
            <div className={styles.missionTitle}>{section.missionTitle}</div>
            <div className={styles.missionText}>{section.missionText}</div>
          </div>
          <a href="https://wa.me/37068803122" target="_blank" rel="noreferrer" className={`${styles.secondaryButtonDark} lux luxDark`}>
            {section.cta}
          </a>
        </div>
      </div>
    </section>
  );
};
