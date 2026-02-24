import styles from "./HomePage.module.css";
import { HeroSection } from "./sections/HeroSection";
import { ProcessSection } from "./sections/ProcessSection";
import { TrustSection } from "./sections/TrustSection";
import { ReviewsFaqSection } from "./sections/ReviewsFaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";

export const HomePage = () => {
    return (
        <main className={styles.page}>
            <HeroSection />
            <ProcessSection />
            <TrustSection />
            <ReviewsFaqSection />
            <FinalCtaSection />
        </main>
    );
};