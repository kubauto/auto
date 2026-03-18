import styles from './ReviewsFaqSection.module.css';
import { useI18n } from '../../../../i18n';

export const ReviewsFaqSection = () => {
  const { t } = useI18n();
  const section = t('home.reviewsFaq');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>{section.reviewsTitle}</h2>
          <p className={styles.sub}>{section.reviewsSub}</p>
        </div>

        <div className={styles.grid3}>
          {section.reviews.map((review) => (
            <div key={review.quote} className={styles.review} tabIndex={0}>
              <div className={styles.reviewQuote}>{review.quote}</div>
              <div className={styles.reviewText}>{review.text}</div>
              <div className={styles.reviewMeta}>{review.meta}</div>
            </div>
          ))}
        </div>

        <div className={styles.sectionHead} style={{ marginTop: 56 }}>
          <h2 className={styles.h2}>{section.faqTitle}</h2>
          <p className={styles.sub}>{section.faqSub}</p>
        </div>

        <div className={styles.faq}>
          {section.faq.map((item) => (
            <div key={item.q} className={styles.faqRow} tabIndex={0}>
              <div className={styles.faqQ}>{item.q}</div>
              <div className={styles.faqA}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
