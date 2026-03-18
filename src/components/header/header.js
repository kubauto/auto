import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import styles from './Header.module.css';
import logo from '../../assets/kubauto-logo.svg';
import {LANGUAGE_LABELS, ROUTE_SEGMENTS, useI18n} from '../../i18n';
import {LocalizedNavLink} from '../localized-link/LocalizedLink';

const ANIM_MS = 280;

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuMounted, setMenuMounted] = useState(false);
    const {lang, t, changeLanguage} = useI18n();

    const openMenu = () => {
        setMenuMounted(true);
        requestAnimationFrame(() => setMenuOpen(true));
    };

    const closeMenu = () => {
        setMenuOpen(false);
        window.setTimeout(() => setMenuMounted(false), ANIM_MS);
    };

    useEffect(() => {
        if (!menuOpen) return undefined;

        const body = document.body;
        const scrollY = window.scrollY;
        const prev = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflow: body.style.overflow,
        };

        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        body.style.overflow = 'hidden';

        return () => {
            body.style.position = prev.position;
            body.style.top = prev.top;
            body.style.left = prev.left;
            body.style.right = prev.right;
            body.style.width = prev.width;
            body.style.overflow = prev.overflow;
            window.scrollTo(0, scrollY);
        };
    }, [menuOpen]);

    useEffect(() => {
        if (!menuMounted) return undefined;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') closeMenu();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [menuMounted]);

    const navClass = ({isActive}) => (isActive ? styles.navActive : styles.navLink);
    const mobileNavClass = ({isActive}) =>
        isActive ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink;

    const navItems = [
        {to: ROUTE_SEGMENTS.home, label: t('nav.home')},
        {to: ROUTE_SEGMENTS.about, label: t('nav.about')},
        {to: ROUTE_SEGMENTS.preOrder, label: t('nav.preOrder')},
        {to: ROUTE_SEGMENTS.contacts, label: t('nav.contacts')},
    ];

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <LocalizedNavLink
                    to=""
                    className={styles.logo}
                    onClick={closeMenu}
                    aria-label={t('nav.logoAria')}
                >
                    <img className={styles.logoImg} src={logo} alt="KUB AUTO" draggable={false}/>
                </LocalizedNavLink>

                <nav className={styles.navDesktop}>
                    {navItems.map((item) => (
                        <LocalizedNavLink
                            key={item.to || 'home'}
                            to={item.to}
                            className={navClass}
                            end={!item.to}
                        >
                            {item.label}
                        </LocalizedNavLink>
                    ))}
                </nav>

                <div className={styles.actionsDesktop}>
                    <div className={styles.langWrap}>
                        <select
                            className={styles.langSelect}
                            value={lang}
                            onChange={(e) => changeLanguage(e.target.value)}
                            aria-label={t('nav.languageSwitcher')}
                        >
                            {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <span className={styles.langChevron} aria-hidden="true"/>
                    </div>

                    <a
                        href="https://wa.me/37068803122"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.iconButton} lux luxIcon`}
                        aria-label={t('common.whatsapp')}
                    >
                        WA
                    </a>

                    <a
                        href="https://t.me/dkud13"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.iconButton} lux luxIcon`}
                        aria-label={t('common.telegram')}
                    >
                        TG
                    </a>

                    <LocalizedNavLink
                        to={ROUTE_SEGMENTS.preOrder}
                        className={`${styles.primaryButton} lux luxGold`}
                    >
                        {t('nav.startPreOrder')}
                    </LocalizedNavLink>
                </div>

                <button
                    type="button"
                    className={styles.burger}
                    onClick={openMenu}
                    aria-label={t('nav.openMenu')}
                    aria-expanded={menuOpen}
                >
                    <span/>
                    <span/>
                </button>
            </div>

            {menuMounted &&
                createPortal(
                    <>
                        <div
                            className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
                            onClick={closeMenu}
                            aria-hidden={!menuOpen}
                        />

                        <aside
                            className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
                            aria-hidden={!menuOpen}
                        >
                            <div className={styles.mobileTop}>
                                <LocalizedNavLink
                                    to=""
                                    className={styles.mobileLogo}
                                    onClick={closeMenu}
                                    aria-label={t('nav.logoAria')}
                                >
                                    <img className={styles.logoImgSmall} src={logo} alt="KUB AUTO" draggable={false}/>
                                </LocalizedNavLink>

                                <button
                                    type="button"
                                    className={styles.close}
                                    onClick={closeMenu}
                                    aria-label={t('nav.closeMenu')}
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.mobileContent}>
                                <nav className={styles.mobileNav}>
                                    {navItems.map((item) => (
                                        <LocalizedNavLink
                                            key={item.to || 'mobile-home'}
                                            to={item.to}
                                            end={!item.to}
                                            onClick={closeMenu}
                                            className={mobileNavClass}
                                        >
                                            {item.label}
                                        </LocalizedNavLink>
                                    ))}
                                </nav>

                                <div className={styles.mobileActions}>
                                    <div className={styles.mobileLanguageRow}>
                    <span className={styles.mobileLanguageLabel}>
                      {t('nav.languageSwitcher')}
                    </span>

                                        <div className={styles.mobileLanguageButtons}>
                                            {Object.entries(LANGUAGE_LABELS).map(([value, label]) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    className={`${styles.mobileLangButton} ${
                                                        value === lang ? styles.mobileLangButtonActive : ''
                                                    }`}
                                                    onClick={() => changeLanguage(value)}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href="https://wa.me/37068803122"
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.mobileActionLink}
                                    >
                                        {t('common.whatsapp')}
                                    </a>

                                    <a
                                        href="https://t.me/dkud13"
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.mobileActionLink}
                                    >
                                        {t('common.telegram')}
                                    </a>

                                    <LocalizedNavLink
                                        to={ROUTE_SEGMENTS.preOrder}
                                        className={`${styles.mobileCTA} lux luxGold`}
                                        onClick={closeMenu}
                                    >
                                        {t('nav.startPreOrder')}
                                    </LocalizedNavLink>
                                </div>
                            </div>
                        </aside>
                    </>,
                    document.body
                )}
        </header>
    );
};