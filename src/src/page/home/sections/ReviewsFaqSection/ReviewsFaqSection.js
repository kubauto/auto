import styles from "./ReviewsFaqSection.module.css";

const REVIEWS = [
    {
        quote: "“Everything on time.”",
        text: "Contract, reports, delivery — clear control at every stage.",
        meta: "A.K., Vilnius",
    },
    {
        quote: "“No surprises.”",
        text: "All costs were fixed in advance. Documentation was flawless.",
        meta: "N.S., Kaunas",
    },
    {
        quote: "“High-level service.”",
        text: "Verification, logistics and handover were handled professionally.",
        meta: "M.P., Riga",
    },
];

const FAQ = [
    {
        q: "How do I start a pre-order?",
        a: "Submit a pre-order form with your requirements. We confirm details and start the selection process.",
    },
    {
        q: "How long does vehicle selection take?",
        a: "Typically from a few days up to two weeks, depending on the complexity of requirements.",
    },
    {
        q: "How are vehicles verified?",
        a: "Each vehicle undergoes technical and legal verification using official databases and inspection reports.",
    },
    {
        q: "When is the contract signed?",
        a: "After you approve a specific vehicle and all conditions are agreed.",
    },
    {
        q: "Which costs are fixed in advance?",
        a: "Service fee, logistics, customs clearance and mandatory charges are fixed in the contract.",
    },
    {
        q: "What happens after the vehicle is purchased?",
        a: "We organize logistics, customs clearance, certification and preparation for handover.",
    },
    {
        q: "When do I receive the vehicle?",
        a: "After all procedures are completed and documents are verified, the vehicle is handed over to you.",
    },
    {
        q: "Can I refuse a selected vehicle?",
        a: "Yes. Selection continues until a vehicle fully matching your requirements is approved.",
    },
    {
        q: "Do you work with companies as well as private clients?",
        a: "Yes. We work with both individuals and legal entities under a formal contract.",
    },
    {
        q: "In which countries do you source vehicles?",
        a: "We source vehicles across Europe, working only with verified suppliers and auction platforms.",
    },
    {
        q: "Is delivery and customs clearance included?",
        a: "Yes. Full logistics, customs clearance and certification are part of our service.",
    },
];

export const ReviewsFaqSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Reviews */}
                <div className={styles.sectionHead}>
                    <h2 className={styles.h2}>Client notes</h2>
                    <p className={styles.sub}>
                        Reserved feedback focused on predictability, control and result.
                    </p>
                </div>

                <div className={styles.grid3}>
                    {REVIEWS.map((r) => (
                        <div key={r.quote} className={styles.review} tabIndex={0}>
                            <div className={styles.reviewQuote}>{r.quote}</div>
                            <div className={styles.reviewText}>{r.text}</div>
                            <div className={styles.reviewMeta}>{r.meta}</div>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className={styles.sectionHead} style={{ marginTop: 56 }}>
                    <h2 className={styles.h2}>FAQ</h2>
                    <p className={styles.sub}>
                        Answers to the most common questions about the process.
                    </p>
                </div>

                <div className={styles.faq}>
                    {FAQ.map((item) => (
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