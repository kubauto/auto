import { useState, useRef, useEffect } from "react";
import styles from "./SelectDropdown.module.css";

export const SelectDropdown = ({
                                   label,
                                   name,
                                   value,
                                   error,
                                   options,
                                   placeholder,
                                   onChange,
                               }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClickOutside = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (
        <div className={styles.field} ref={ref}>
            <div className={styles.labelRow}>
                <span className={styles.label}>{label}</span>
                {error && <span className={styles.error}>{error}</span>}
            </div>

            <button
                type="button"
                className={`${styles.control} ${error ? styles.errorBorder : ""}`}
                onClick={() => setOpen((v) => !v)}
            >
                <span className={value ? styles.value : styles.placeholder}>
                    {value || placeholder}
                </span>
                <span className={styles.chevron} />
            </button>

            {open && (
                <div className={styles.menu}>
                    {options.map((opt) => (
                        <div
                            key={opt}
                            className={`${styles.item} ${opt === value ? styles.active : ""}`}
                            onClick={() => {
                                onChange(name, opt);
                                setOpen(false);
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};