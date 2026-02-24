import styles from "./TrustSection.module.css";

export const TrustSection = () => {
    return (
        <section className={styles.sectionAlt}>
            <div className={styles.container}>
                <div className={styles.sectionHead}>
                    <h2 className={styles.h2}>Why clients trust us</h2>
                    <p className={styles.sub}>Transparency + legal safety across the entire transaction.</p>
                </div>

                <div className={styles.grid3}>
                    <div className={styles.card}>
                        <h3 className={styles.h3}>Formal contract</h3>
                        <p className={styles.cardText}>Fees, stages and timelines fixed.</p>
                        <div className={styles.goldBar} />
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.h3}>Verification</h3>
                        <p className={styles.cardText}>Official databases + reports.</p>
                        <div className={styles.goldBar} />
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.h3}>End-to-end</h3>
                        <p className={styles.cardText}>Logistics, customs, certification.</p>
                        <div className={styles.goldBar} />
                    </div>
                </div>

                <div className={styles.missionStrip}>
                    <div>
                        <div className={styles.missionTitle}>Regulated procedure</div>
                        <div className={styles.missionText}>
                            Selection → verification → agreement → contract → purchase → delivery → handover. Every step documented.
                        </div>
                    </div>

                    <a href="https://wa.me/37068803122" target="_blank" rel="noreferrer" className={`${styles.secondaryButtonDark} lux luxDark`}>
                        Get a consultation
                    </a>
                </div>
            </div>
        </section>
    );
};