import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './VehicleCarousel.module.css';

const AUTO_PLAY_MS = 4200;
const SWIPE_THRESHOLD = 45;

export const VehicleCarousel = ({
                                    slides = [],
                                    autoPlay = true,
                                    autoPlayMs = AUTO_PLAY_MS,
                                    className = '',
                                }) => {
    const safeSlides = useMemo(
        () => slides.filter((slide) => slide && slide.src),
        [slides]
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const total = safeSlides.length;

    useEffect(() => {
        if (!total) return undefined;
        if (!autoPlay || paused || total <= 1) return undefined;

        const id = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % total);
        }, autoPlayMs);

        return () => window.clearInterval(id);
    }, [autoPlay, autoPlayMs, paused, total]);

    useEffect(() => {
        if (!total) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setActiveIndex((prev) => (prev - 1 + total) % total);
            }

            if (e.key === 'ArrowRight') {
                setActiveIndex((prev) => (prev + 1) % total);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [total]);

    const goTo = (index) => {
        if (!total) return;
        const normalized = ((index % total) + total) % total;
        setActiveIndex(normalized);
    };

    const goPrev = () => goTo(activeIndex - 1);
    const goNext = () => goTo(activeIndex + 1);

    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const delta = touchEndX.current - touchStartX.current;

        if (Math.abs(delta) < SWIPE_THRESHOLD) return;

        if (delta > 0) {
            goPrev();
        } else {
            goNext();
        }
    };

    if (!total) return null;

    return (
        <div
            className={`${styles.carousel} ${className}`.trim()}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={styles.viewport}>
                <div
                    className={styles.track}
                    style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
                >
                    {safeSlides.map((slide, index) => (
                        <div className={styles.slide} key={`${slide.src}-${index}`}>
                            <div className={styles.imageShell}>
                                <img
                                    className={styles.image}
                                    src={slide.src}
                                    alt={slide.alt || `Vehicle slide ${index + 1}`}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    style={{
                                        objectPosition: slide.position || 'center center',
                                    }}
                                />
                                <div className={styles.imageOverlay} />
                            </div>
                        </div>
                    ))}
                </div>

                {total > 1 ? (
                    <>
                        <button
                            type="button"
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={goPrev}
                            aria-label="Previous slide"
                        >
                            <span className={styles.arrowLeft} />
                        </button>

                        <button
                            type="button"
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={goNext}
                            aria-label="Next slide"
                        >
                            <span className={styles.arrowRight} />
                        </button>
                    </>
                ) : null}

                <div className={styles.bottomBar}>
                    <div className={styles.counter}>
            <span className={styles.counterCurrent}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
                        <span className={styles.counterDivider}>/</span>
                        <span className={styles.counterTotal}>
              {String(total).padStart(2, '0')}
            </span>
                    </div>

                    {total > 1 ? (
                        <div className={styles.dots}>
                            {safeSlides.map((slide, index) => (
                                <button
                                    key={`${slide.src}-dot-${index}`}
                                    type="button"
                                    className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                                    onClick={() => goTo(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};