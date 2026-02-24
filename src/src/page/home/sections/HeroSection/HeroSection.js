import { NavLink } from "react-router-dom";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <p className={styles.kicker}>PRIVATE ACQUISITION SERVICE</p>

                <h1 className={styles.h1}>
                    Premium vehicles <br /> by individual pre-order
                </h1>

                <p className={styles.lead}>
                    Selection, verification, purchase and delivery across Europe — with fixed terms and legal safety.
                </p>

                <div className={styles.heroActions}>
                    <NavLink to="/pre-order" className={`${styles.primaryButton} lux luxGold`}>
                        Start Pre-Order
                    </NavLink>

                    <a href="https://wa.me/37068803122" target="_blank" rel="noreferrer" className={`${styles.secondaryButton} lux luxDark`}>
                        WhatsApp / Telegram
                    </a>
                </div>

                <div className={styles.pills}>
                    <span className={styles.pill}>Contract-based</span>
                    <span className={styles.pill}>Official databases</span>
                    <span className={styles.pill}>End-to-end support</span>
                </div>

                <div className={styles.glassCard}>
                    <div className={styles.glassHeader}>
                        <span className={styles.glassTitle}>What you get</span>
                        <span className={styles.badge}>STANDARD</span>
                    </div>

                    <ul className={styles.bullets}>
                        <li>Documented process and fixed fees</li>
                        <li>Technical + legal checks before purchase</li>
                        <li>Logistics, customs, certification, handover</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};