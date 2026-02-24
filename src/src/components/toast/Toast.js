import { useEffect, useRef } from "react";
import styles from "./Toast.module.css";

export const Toast = ({ type = "idle", message = "", onClose, autoHideMs = 0 }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        if (!message || !autoHideMs) return;

        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            onClose?.();
        }, autoHideMs);

        return () => window.clearTimeout(timerRef.current);
    }, [message, autoHideMs, onClose]);

    if (!message || type === "idle") return null;

    const cls =
        type === "success"
            ? `${styles.toast} ${styles.success}`
            : `${styles.toast} ${styles.error}`;

    return (
        <div className={cls} role="status" aria-live="polite">
            <span className={styles.text}>{message}</span>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close notification">
                ×
            </button>
        </div>
    );
};