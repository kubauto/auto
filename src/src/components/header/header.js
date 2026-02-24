import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import {createPortal} from "react-dom";

const ANIM_MS = 280;

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuMounted, setMenuMounted] = useState(false);

    const openMenu = () => {
        setMenuMounted(true);
        requestAnimationFrame(() => setMenuOpen(true));
    };

    const closeMenu = () => {
        setMenuOpen(false);
        window.setTimeout(() => setMenuMounted(false), ANIM_MS);
    };

    // Lock body scroll when menu is open
    useEffect(() => {
        if (!menuOpen) return;

        const body = document.body;
        const scrollY = window.scrollY;

        // save previous inline styles to restore precisely
        const prev = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            width: body.style.width,
            overflow: body.style.overflow,
        };

        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
        body.style.overflow = "hidden";

        return () => {
            // restore styles
            body.style.position = prev.position;
            body.style.top = prev.top;
            body.style.left = prev.left;
            body.style.right = prev.right;
            body.style.width = prev.width;
            body.style.overflow = prev.overflow;

            // restore scroll position
            window.scrollTo(0, scrollY);
        };
    }, [menuOpen]);

    // Close on Escape
    useEffect(() => {
        if (!menuMounted) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") closeMenu();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [menuMounted]);

    const navClass = ({ isActive }) =>
        isActive ? styles.navActive : styles.navLink;

    const mobileNavClass = ({ isActive }) =>
        isActive ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <NavLink to="/" className={styles.logo} onClick={closeMenu}>
                    <span className={styles.logoMark} />
                    <div className={styles.logoText}>
                        <span className={styles.logoName}>KUB AUTO</span>
                        <span className={styles.logoSub}>Premium pre-order concierge</span>
                    </div>
                </NavLink>

                {/* Desktop navigation */}
                <nav className={styles.navDesktop}>
                    <NavLink to="/" className={navClass} end>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={navClass}>
                        About
                    </NavLink>
                    <NavLink to="/pre-order" className={navClass}>
                        Pre-Order
                    </NavLink>
                    <NavLink to="/contacts" className={navClass}>
                        Contacts
                    </NavLink>
                </nav>

                {/* Desktop actions */}
                <div className={styles.actionsDesktop}>
                    <a
                        href="https://wa.me/37068803122"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.iconButton} lux luxIcon`}
                        aria-label="WhatsApp"
                    >
                        WA
                    </a>
                    <a
                        href="https://t.me/kolyakolya12"
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.iconButton} lux luxIcon`}
                        aria-label="Telegram"
                    >
                        TG
                    </a>
                    <NavLink to="/pre-order" className={`${styles.primaryButton} lux luxGold`}>
                        Start Pre-Order
                    </NavLink>
                </div>

                {/* Mobile burger */}
                <button
                    type="button"
                    className={styles.burger}
                    onClick={openMenu}
                    aria-label="Open menu"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile overlay + drawer are mounted only when needed */}
            {menuMounted &&
                createPortal(
                    <>
                        <div
                            className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
                            onClick={closeMenu}
                            aria-hidden={!menuOpen}
                        />

                        <aside
                            className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
                            aria-hidden={!menuOpen}
                        >
                            <div className={styles.mobileTop}>
                                <NavLink to="/" className={styles.mobileLogo} onClick={closeMenu}>
                                    <span className={styles.logoMark} />
                                    <span className={styles.mobileLogoText}>KUB AUTO</span>
                                </NavLink>

                                <button type="button" className={styles.close} onClick={closeMenu} aria-label="Close menu">
                                    ×
                                </button>
                            </div>

                            <nav className={styles.mobileNav}>
                                <NavLink to="/" end onClick={closeMenu} className={mobileNavClass}>
                                    Home
                                </NavLink>
                                <NavLink to="/about" onClick={closeMenu} className={mobileNavClass}>
                                    About
                                </NavLink>
                                <NavLink to="/pre-order" onClick={closeMenu} className={mobileNavClass}>
                                    Pre-Order
                                </NavLink>
                                <NavLink to="/contacts" onClick={closeMenu} className={mobileNavClass}>
                                    Contacts
                                </NavLink>
                            </nav>

                            <div className={styles.mobileActions}>
                                <a
                                    href="https://wa.me/37068803122"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={styles.mobileActionLink}
                                >
                                    WhatsApp
                                </a>
                                <a href="https://t.me/kolyakolya12" target="_blank" rel="noreferrer" className={styles.mobileActionLink}>
                                    Telegram
                                </a>

                                <NavLink to="/pre-order" className={`${styles.mobileCTA} lux luxGold`} onClick={closeMenu}>
                                    Start Pre-Order
                                </NavLink>
                            </div>
                        </aside>
                    </>,
                    document.body
                )}
        </header>
    );
};