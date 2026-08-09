import { Fragment } from "react";
import Image from "next/image";
import { platformsIntro, platforms } from "../models";
import ScrollReveal from "./ScrollReveal";

const platformIcons: Record<string, string> = {
  windows: "/downloads/windows-icon.png",
  mac: "/downloads/apple-icon.png",
};

export default function PlatformSection() {
  return (
    <section id="download" className="dl-platform-section">
      <ScrollReveal as="h2" className="dl-platform-section__heading">{platformsIntro.heading}</ScrollReveal>
      <div className="dl-platform-section__grid">
        {platforms.map((platform, index) => (
          <Fragment key={platform.id}>
            {index > 0 && <div className="dl-platform-section__divider" aria-hidden />}
            <ScrollReveal className="dl-platform-card" delayMs={index * 120}>
              <div className="dl-platform-card__badge">
                <Image src={platformIcons[platform.id]} alt="" aria-hidden width={62} height={62} />
                <span>{platform.label}</span>
              </div>
              <div className="dl-platform-card__actions">
                <a href={platform.installHref} className="dl-platform-card__button dl-platform-card__button--outline">How to install</a>
                <a href={platform.downloadHref} className="dl-platform-card__button dl-platform-card__button--filled">Download</a>
              </div>
            </ScrollReveal>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
