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

        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={styles.field} ref={ref}>
            <div className={styles.labelRow}>
                <span className={styles.label}>{label}</span>
                {error ? <span className={styles.error}>{error}</span> : null}
            </div>

            <button
                type="button"
                className={`${styles.control} ${error ? styles.errorBorder : ""}`}
                onClick={() => setOpen((v) => !v)}
            >
                <span className={selectedOption ? styles.value : styles.placeholder}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className={styles.chevron} />
            </button>

            {open ? (
                <div className={styles.menu}>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`${styles.item} ${opt.value === value ? styles.active : ""}`}
                            onClick={() => {
                                onChange(name, opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};