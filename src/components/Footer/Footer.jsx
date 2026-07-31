import instagramIcon from '../../assets/images/instagram-icon.svg';
import linkedinIcon from '../../assets/images/linkedin-icon.svg';
import footerBadge from '../../assets/images/footer-badge.png';
import { footerContent } from '../../models/footerModel';
import './Footer.css';

const socialIcons = {
  instagram: instagramIcon,
  linkedin: linkedinIcon,
};

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <img className="footer__badge" src={footerBadge} alt="" aria-hidden="true" />
      <div className="footer__column">
        <p className="footer__label">{footerContent.contact.label}</p>
        <p className="footer__value">{footerContent.contact.value}</p>
      </div>
      <div className="footer__column">
        <p className="footer__label">{footerContent.socials.label}</p>
        <div className="footer__socials">
          {footerContent.socials.links.map((link) => (
            <a key={link.id} href={link.href} target="_blank" rel="noreferrer" aria-label={link.name}>
              <img src={socialIcons[link.id]} alt="" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div className="footer__bottom">
        <p>{footerContent.copyright}</p>
        <div className="footer__legal">
          {footerContent.legalLinks.map((link) => (
            <a key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <p className="footer__attribution">
          {footerContent.attribution.prefix}
          <strong>{footerContent.attribution.name}</strong>
        </p>
      </div>
    </footer>
  );
}
