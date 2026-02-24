import { NavLink } from "react-router-dom";
import styles from "./FinalCtaSection.module.css";

export const FinalCtaSection = () => {
    return (
        <section className={styles.finalCta}>
            <div className={styles.container}>
                <p className={styles.kickerGold}>READY TO BEGIN</p>
                <h2 className={styles.h2OnDark}>Start your pre-order request</h2>
                <p className={styles.subOnDark}>We’ll respond with verified options and clear terms.</p>

                <div className={styles.finalActions}>
                    <NavLink to="/pre-order" className={`${styles.primaryButton} lux luxGold`}>
                        Proceed to Pre-Order
                    </NavLink>

                    <a
                        href="https://wa.me/37068803122"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.secondaryButton} lux luxDark`}
                    >
                        WhatsApp
                    </a>

                    <a href="https://t.me/kolyakolya12" target="_blank" rel="noreferrer" className={`${styles.secondaryButton} lux luxDark`}>
                        Telegram
                    </a>
                </div>

                <div className={styles.contactStrip}>
                    <div>
                        <div className={styles.contactLabel}>Phone</div>
                        <div className={styles.contactValue}>+370 688 03122</div>
                    </div>
                    <div>
                        <div className={styles.contactLabel}>Email</div>
                        <div className={styles.contactValue}>uabkubauto@gmail.com</div>
                    </div>
                    <div>
                        <div className={styles.contactLabel}>Office</div>
                        <div className={styles.contactValueSmall}>Dzūkų g. 6a, Vilnius</div>
                    </div>
                </div>
            </div>
        </section>
    );
};