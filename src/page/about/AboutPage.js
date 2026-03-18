import styles from './AboutPage.module.css';
import { LocalizedLink } from '../../components/localized-link/LocalizedLink';
import { Seo } from '../../components/seo/Seo';
import { ROUTE_SEGMENTS, useI18n } from '../../i18n';

export const AboutPage = () => {
  const { lang, t } = useI18n();
  const seo = t('seo.about');
  const page = t('about');

  return (
    <main className={styles.page}>
      <Seo lang={lang} routePath={ROUTE_SEGMENTS.about} title={seo.title} description={seo.description} />

      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>{page.hero.kicker}</p>
          <h1 className={styles.h1}>{page.hero.title}</h1>
          <p className={styles.lead}>{page.hero.lead}</p>

          <div className={styles.heroActions}>
            <LocalizedLink className={`${styles.heroBtn} lux luxGold`} to={ROUTE_SEGMENTS.preOrder}>{page.hero.cta}</LocalizedLink>
            <a className={`${styles.heroBtn} lux luxDark`} href="https://wa.me/37068803122" target="_blank" rel="noreferrer">{t('common.whatsapp')}</a>
            <a className={`${styles.heroBtn} lux luxDark`} href="https://t.me/dkud13" target="_blank" rel="noreferrer">{t('common.telegram')}</a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.block}>
            <div className={styles.blockHead}>
              <h2 className={styles.h2}>{page.overview.title}</h2>
              <p className={styles.sub}>{page.overview.sub}</p>
            </div>
            <div className={styles.textGrid}>
              {page.overview.cards.map((card) => (
                <div key={card.title} className={styles.textCard}>
                  <div className={styles.textTitle}>{card.title}</div>
                  <p className={styles.textBody}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockHead}>
              <h2 className={styles.h2}>{page.principles.title}</h2>
              <p className={styles.sub}>{page.principles.sub}</p>
            </div>
            <div className={styles.cards}>
              {page.principles.cards.map((card) => (
                <div key={card.title} className={`${styles.card} ${styles.cardNoHover}`}>
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <div className={styles.cardTitle}>{card.title}</div>
                  <div className={styles.cardText}>{card.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockHead}>
              <h2 className={styles.h2}>{page.advantages.title}</h2>
              <p className={styles.sub}>{page.advantages.sub}</p>
            </div>
            <div className={styles.benefits}>
              {page.advantages.items.map((item) => (
                <div key={item} className={styles.benefitRow}>
                  <div className={styles.bullet} />
                  <div className={styles.benefitText}>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mission}>
            <div className={styles.missionInner}>
              <div>
                <div className={styles.missionKicker}>{page.mission.kicker}</div>
                <div className={styles.missionTitle}>{page.mission.title}</div>
                <div className={styles.missionText}>{page.mission.text}</div>
              </div>
              <div className={styles.missionActions}>
                <LocalizedLink className={`${styles.missionBtn} lux luxGold`} to={ROUTE_SEGMENTS.preOrder}>{page.mission.ctaPrimary}</LocalizedLink>
                <LocalizedLink className={`${styles.missionBtn} lux luxDark`} to={ROUTE_SEGMENTS.contacts}>{page.mission.ctaSecondary}</LocalizedLink>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockHead}>
              <h2 className={styles.h2}>{page.process.title}</h2>
              <p className={styles.sub}>{page.process.sub}</p>
            </div>
            <div className={styles.process}>
              {page.process.steps.map((step) => (
                <div key={step.num} className={styles.step}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepText}>{step.text}</div>
                </div>
              ))}
            </div>
            <div className={styles.bottomCta}>
              <LocalizedLink className={`${styles.bottomBtn} lux luxGold`} to={ROUTE_SEGMENTS.preOrder}>{page.process.ctaPrimary}</LocalizedLink>
              <a className={`${styles.bottomBtn} lux luxDark`} href="https://t.me/dkud13" target="_blank" rel="noreferrer">{page.process.ctaSecondary}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
