import { whatsNewIntro, features } from "../models";
import FeatureBlock from "./FeatureBlock";
import ScrollReveal from "./ScrollReveal";

export default function WhatsNewSection() {
  return (
    <section id="whats-new" className="dl-whats-new">
      <ScrollReveal as="h2" className="dl-whats-new__heading">{whatsNewIntro.heading}</ScrollReveal>
      <ScrollReveal as="p" className="dl-whats-new__subheading" delayMs={100}>{whatsNewIntro.subheading}</ScrollReveal>
      <div className="dl-whats-new__grid">
        {features.map((feature, index) => (
          <FeatureBlock key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
