import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/context";
import { LanguageSwitcher } from "@/components/UI/LanguageSwitcher";
import { cx } from "@/utils/helpers";
import styles from "./Navbar.module.css";
import logoIcon from '@/assets/icons/G.svg'

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { to: "/", label: t.nav.home },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
    { to: "/resume", label: t.nav.resume },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [t]); // close menu on language change

  return (
    <header className={cx(styles.navbar, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        {/* Logo */}
        {/* <Link to="/" className={styles.logo} aria-label="Go to home">
          {profile.nameDisplay}
        </Link> */}
        <Link to="/" className={styles.logo} aria-label="Go to home">
          <img src={logoIcon} alt="Logo" className={styles.logoIcon} />
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cx(styles.link, isActive && styles.active)
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: Language + burger */}
        <div className={styles.controls}>
          <LanguageSwitcher />

          <button type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            {...{}} aria-label={t.nav?.toggleMenu ?? "Toggle menu"}
          >
            <span className={cx(styles.bar, menuOpen && styles.bar1)} />
            <span className={cx(styles.bar, menuOpen && styles.bar2)} />
            <span className={cx(styles.bar, menuOpen && styles.bar3)} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cx(styles.drawer, menuOpen && styles.drawerOpen)}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cx(styles.drawerLink, isActive && styles.active)
            }
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        {/* Language switcher in mobile drawer too */}
        <div className={styles.drawerLang}>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
