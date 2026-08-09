import Image from "next/image";
import { footerContent } from "../models";

const socialIcons: Record<string, string> = {
  instagram: "/downloads/instagram-icon.svg",
  linkedin: "/downloads/linkedin-icon.svg",
};

export default function Footer() {
  return (
    <footer id="contact" className="dl-footer">
      <Image className="dl-footer__badge" src="/downloads/footer-badge.png" alt="" aria-hidden width={120} height={120} />
      <div className="dl-footer__column">
        <p className="dl-footer__label">{footerContent.contact.label}</p>
        <p className="dl-footer__value">{footerContent.contact.value}</p>
      </div>
      <div className="dl-footer__column">
        <p className="dl-footer__label">{footerContent.socials.label}</p>
        <div className="dl-footer__socials">
          {footerContent.socials.links.map((link) => (
            <a key={link.id} href={link.href} target="_blank" rel="noreferrer" aria-label={link.name}>
              <Image src={socialIcons[link.id]} alt="" aria-hidden width={38} height={38} />
            </a>
          ))}
        </div>
      </div>
      <div className="dl-footer__bottom">
        <p>{footerContent.copyright}</p>
        <div className="dl-footer__legal">
          {footerContent.legalLinks.map((link) => (
            <a key={link.id} href={link.href}>{link.label}</a>
          ))}
        </div>
        <p className="dl-footer__attribution">
          {footerContent.attribution.prefix}<strong>{footerContent.attribution.name}</strong>
        </p>
      </div>
    </footer>
  );
}
