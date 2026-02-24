import { NavLink } from "react-router-dom";
import styles from "./ProcessSection.module.css";

export const ProcessSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.sectionHead}>
                    <h2 className={styles.h2}>The process</h2>
                    <p className={styles.sub}>Clear, documented, predictable.</p>
                </div>

                <div className={styles.processCard}>
                    <div className={styles.processSteps}>
                        <div className={styles.step}>
                            <div className={styles.stepDotActive} />
                            <div className={styles.stepTitle}>Request</div>
                            <div className={styles.stepSub}>Requirements</div>
                        </div>

                        <div className={styles.stepLine} />

                        <div className={styles.step}>
                            <div className={styles.stepDotActive} />
                            <div className={styles.stepTitle}>Market scan</div>
                            <div className={styles.stepSub}>Verified sources</div>
                        </div>

                        <div className={styles.stepLine} />

                        <div className={styles.step}>
                            <div className={styles.stepDotActive} />
                            <div className={styles.stepTitle}>Verification</div>
                            <div className={styles.stepSub}>Legal + technical</div>
                        </div>

                        <div className={styles.stepLine} />

                        <div className={styles.step}>
                            <div className={styles.stepDot} />
                            <div className={styles.stepTitle}>Contract</div>
                            <div className={styles.stepSub}>Fixed terms</div>
                        </div>

                        <div className={styles.stepLine} />

                        <div className={styles.step}>
                            <div className={styles.stepDot} />
                            <div className={styles.stepTitle}>Delivery</div>
                            <div className={styles.stepSub}>Handover</div>
                        </div>
                    </div>
                </div>

                <div className={styles.ctaBar}>
                    <div>
                        <div className={styles.ctaTitle}>Submit requirements — we return with verified options</div>
                        <div className={styles.ctaText}>Typical selection time: a few days up to two weeks.</div>
                    </div>

                    <NavLink to="/pre-order" className={`${styles.primaryButtonDark} lux luxGold`}>
                        Start Pre-Order
                    </NavLink>
                </div>
            </div>
        </section>
    );
};