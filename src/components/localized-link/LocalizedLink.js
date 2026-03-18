import { Link, NavLink } from 'react-router-dom';
import { buildLocalizedPath, useI18n } from '../../i18n';

export const LocalizedLink = ({ to = '', ...props }) => {
  const { lang } = useI18n();
  return <Link to={buildLocalizedPath(lang, to)} {...props} />;
};

export const LocalizedNavLink = ({ to = '', ...props }) => {
  const { lang } = useI18n();
  return <NavLink to={buildLocalizedPath(lang, to)} {...props} />;
};
