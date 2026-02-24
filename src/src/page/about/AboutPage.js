import styles from "./AboutPage.module.css";

export const AboutPage = () => {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <p className={styles.kicker}>ABOUT THE COMPANY</p>
                    <h1 className={styles.h1}>
                        Premium vehicles acquired through individual pre-order across Europe
                    </h1>
                    <p className={styles.lead}>
                        We provide professional selection, verification and acquisition of premium vehicles based on individual client
                        requests, with full legal and logistical support from initial search to final handover.
                    </p>

                    <div className={styles.heroActions}>
                        <a className={`${styles.heroBtn} lux luxGold`} href="/pre-order">
                            Submit a pre-order request
                        </a>

                        <a
                            className={`${styles.heroBtn} lux luxDark`}
                            href="https://wa.me/37068803122"
                            target="_blank"
                            rel="noreferrer"
                        >
                            WhatsApp
                        </a>

                        <a
                            className={`${styles.heroBtn} lux luxDark`}
                            href="https://t.me/kolyakolya12"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Telegram
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    {/* Company profile */}
                    <div className={styles.block}>
                        <div className={styles.blockHead}>
                            <h2 className={styles.h2}>General overview</h2>
                            <p className={styles.sub}>
                                Our services are designed for clients who value transparency, structured processes and legal security.
                            </p>
                        </div>

                        <div className={styles.textGrid}>
                            <div className={styles.textCard}>
                                <div className={styles.textTitle}>Scope of activity</div>
                                <p className={styles.textBody}>
                                    The company specializes in sourcing, verifying and purchasing premium vehicles on the European market,
                                    including official dealerships, verified suppliers and auction platforms. All stages — from initial
                                    selection to vehicle handover — are performed in accordance with a unified quality standard and agreed
                                    timelines.
                                </p>
                            </div>

                            <div className={styles.textCard}>
                                <div className={styles.textTitle}>End-to-end support</div>
                                <p className={styles.textBody}>
                                    We provide vehicle selection based on defined parameters, documented technical and legal verification,
                                    fixation of scope and pricing within a contract, organization of purchase, logistics, customs clearance,
                                    certification and preparation of the vehicle for final delivery.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Principles */}
                    <div className={styles.block}>
                        <div className={styles.blockHead}>
                            <h2 className={styles.h2}>Principles of work</h2>
                            <p className={styles.sub}>
                                A structured, documented process with clear responsibility at every stage.
                            </p>
                        </div>

                        <div className={styles.cards}>
                            <div className={`${styles.card} ${styles.cardNoHover}`}>
                                <div className={styles.cardIcon}>✓</div>
                                <div className={styles.cardTitle}>Formality and transparency</div>
                                <div className={styles.cardText}>
                                    All stages of cooperation and service fees are fixed in a contract. The client has full clarity on the
                                    process, timelines and obligations of each party.
                                </div>
                            </div>

                            <div className={`${styles.card} ${styles.cardNoHover}`}>
                                <div className={styles.cardIcon}>🧾</div>
                                <div className={styles.cardTitle}>Comprehensive vehicle verification</div>
                                <div className={styles.cardText}>
                                    Each vehicle undergoes technical and legal verification using official databases, service history and,
                                    where required, independent expert inspection.
                                </div>
                            </div>

                            <div className={`${styles.card} ${styles.cardNoHover}`}>
                                <div className={styles.cardIcon}>🎯</div>
                                <div className={styles.cardTitle}>Individual approach</div>
                                <div className={styles.cardText}>
                                    Vehicle selection is carried out strictly in accordance with the client’s budget, preferences and
                                    intended usage — without random or unsuitable offers.
                                </div>
                            </div>

                            <div className={`${styles.card} ${styles.cardNoHover}`}>
                                <div className={styles.cardIcon}>🛡</div>
                                <div className={styles.cardTitle}>Full сопровождение</div>
                                <div className={styles.cardText}>
                                    We organize the purchase, logistics, customs clearance, certification and preparation of the vehicle for
                                    handover, minimizing risks and client involvement.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className={styles.block}>
                        <div className={styles.blockHead}>
                            <h2 className={styles.h2}>Key advantages</h2>
                            <p className={styles.sub}>
                                Why clients choose an individual pre-order format with professional support.
                            </p>
                        </div>

                        <div className={styles.benefits}>
                            <div className={styles.benefitRow}>
                                <div className={styles.bullet} />
                                <div className={styles.benefitText}>
                                    Proven expertise in the premium automotive segment
                                </div>
                            </div>
                            <div className={styles.benefitRow}>
                                <div className={styles.bullet} />
                                <div className={styles.benefitText}>
                                    Cooperation exclusively with verified suppliers and auction platforms
                                </div>
                            </div>
                            <div className={styles.benefitRow}>
                                <div className={styles.bullet} />
                                <div className={styles.benefitText}>
                                    Clearly structured workflow and strict adherence to agreed timelines
                                </div>
                            </div>
                            <div className={styles.benefitRow}>
                                <div className={styles.bullet} />
                                <div className={styles.benefitText}>
                                    Responsibility for results at every stage of the transaction
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className={styles.mission}>
                        <div className={styles.missionInner}>
                            <div>
                                <div className={styles.missionKicker}>MISSION</div>
                                <div className={styles.missionTitle}>
                                    To provide access to premium vehicles with guaranteed quality and legal security.
                                </div>
                                <div className={styles.missionText}>
                                    We deliver a structured, transparent and professional service at every stage — from initial selection
                                    to final vehicle handover with complete documentation.
                                </div>
                            </div>

                            <div className={styles.missionActions}>
                                <a className={`${styles.missionBtn} lux luxGold`} href="/pre-order">
                                    Submit a pre-order request
                                </a>
                                <a className={`${styles.missionBtn} lux luxDark`} href="/contacts">
                                    Contact us
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Process */}
                    <div className={styles.block}>
                        <div className={styles.blockHead}>
                            <h2 className={styles.h2}>How the pre-order process works</h2>
                            <p className={styles.sub}>
                                A sequential procedure with defined stages and control points.
                            </p>
                        </div>

                        <div className={styles.process}>
                            <div className={styles.step}>
                                <div className={styles.stepNum}>01</div>
                                <div className={styles.stepTitle}>Request</div>
                                <div className={styles.stepText}>
                                    You submit vehicle parameters and individual requirements.
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNum}>02</div>
                                <div className={styles.stepTitle}>Selection</div>
                                <div className={styles.stepText}>
                                    We source and present verified vehicle options matching your criteria.
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNum}>03</div>
                                <div className={styles.stepTitle}>Contract</div>
                                <div className={styles.stepText}>
                                    All terms, stages and service fees are fixed contractually.
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNum}>04</div>
                                <div className={styles.stepTitle}>Purchase & logistics</div>
                                <div className={styles.stepText}>
                                    We organize the purchase, delivery, customs clearance and certification.
                                </div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.stepNum}>05</div>
                                <div className={styles.stepTitle}>Handover</div>
                                <div className={styles.stepText}>
                                    The vehicle is prepared and handed over with a complete set of documents.
                                </div>
                            </div>
                        </div>

                        <div className={styles.bottomCta}>
                            <a className={`${styles.bottomBtn} lux luxGold`} href="/pre-order">
                                Submit a pre-order request
                            </a>
                            <a
                                className={`${styles.bottomBtn} lux luxDark`}
                                href="https://t.me/kolyakolya12"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ask a question on Telegram
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};