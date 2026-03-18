import styles from './VehicleShowcaseSection.module.css';
import { VehicleCarousel } from '../../../../components/vehicleCarousel/VehicleCarousel';
import { showcaseSlides } from '../../../../config/showcaseSlides';
import { ROUTE_SEGMENTS, useI18n } from '../../../../i18n';
import { LocalizedNavLink } from '../../../../components/localized-link/LocalizedLink';

export const VehicleShowcaseSection = () => {
    const { t } = useI18n();

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.shell}>
                    <div className={styles.topRow}>
                        <div className={styles.copy}>
                            <p className={styles.kicker}>
                                {t('home.gallery.kicker', 'SELECTED VEHICLES')}
                            </p>
                            <h2 className={styles.h2}>
                                {t('home.gallery.title', 'Real premium cars from recent sourcing')}
                            </h2>
                            <p className={styles.sub}>
                                {t(
                                    'home.gallery.sub',
                                    'A live-style gallery block for real vehicle photos. Auto-rotates, supports manual navigation, and fits the visual language of the site.'
                                )}
                            </p>
                        </div>

                        <LocalizedNavLink
                            to={ROUTE_SEGMENTS.preOrder}
                            className={`${styles.cta} lux luxGold`}
                        >
                            {t('nav.startPreOrder')}
                        </LocalizedNavLink>
                    </div>

                    <VehicleCarousel slides={showcaseSlides} />
                </div>
            </div>
        </section>
    );
};