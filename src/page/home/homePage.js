import styles from './HomePage.module.css';
import { HeroSection } from './sections/HeroSection';
import { VehicleShowcaseSection } from './sections/VehicleShowcaseSection';
import { ProcessSection } from './sections/ProcessSection';
import { TrustSection } from './sections/TrustSection';
import { ReviewsFaqSection } from './sections/ReviewsFaqSection';
import { FinalCtaSection } from './sections/FinalCtaSection';
import { useI18n } from '../../i18n';
import { Seo } from '../../components/seo/Seo';

export const HomePage = () => {
    const { lang, t } = useI18n();
    const seo = t('seo.home');

    return (
        <main className={styles.page}>
            <Seo lang={lang} routePath="" title={seo.title} description={seo.description} />
            <HeroSection />
            <VehicleShowcaseSection />
            <ProcessSection />
            <TrustSection />
            <ReviewsFaqSection />
            <FinalCtaSection />
        </main>
    );
};