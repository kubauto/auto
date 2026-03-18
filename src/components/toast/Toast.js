import { useEffect, useRef } from 'react';
import styles from './Toast.module.css';
import { useI18n } from '../../i18n';

export const Toast = ({ type = 'idle', message = '', onClose, autoHideMs = 0 }) => {
  const timerRef = useRef(null);
  const { t } = useI18n();

  useEffect(() => {
    if (!message || !autoHideMs) return undefined;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => onClose?.(), autoHideMs);
    return () => window.clearTimeout(timerRef.current);
  }, [message, autoHideMs, onClose]);

  if (!message || type === 'idle') return null;
  const cls = type === 'success' ? `${styles.toast} ${styles.success}` : `${styles.toast} ${styles.error}`;

  return (
    <div className={cls} role="status" aria-live="polite">
      <span className={styles.text}>{message}</span>
      <button type="button" className={styles.close} onClick={onClose} aria-label={t('common.closeNotification')}>
        ×
      </button>
    </div>
  );
};
