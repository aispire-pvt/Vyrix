import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { navLinks, contactCta } from '../../models/navigationModel';
import './Header.css';

export default function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      if (y < 80) {
        setHidden(false); // always visible near the top (hero)
      } else if (delta > 4) {
        setHidden(true); // scrolling down -> hide
      } else if (delta < -4) {
        setHidden(false); // scrolling up -> show
      }

      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={`header ${hidden ? 'header--hidden' : ''}`.trim()}>
      <a href="#top" className="header__logo">
        <img src={logo} alt="Vyrix" />
      </a>
      <nav className="header__nav">
        {navLinks.map((link) => (
          <a key={link.id} href={link.href} className="header__link">
            {link.label}
          </a>
        ))}
      </nav>
      <a href={contactCta.href} className="header__cta">
        {contactCta.label}
      </a>
    </header>
  );
}
