import { whatsNewIntro, features } from '../../models/featuresModel';
import FeatureBlock from '../FeatureBlock/FeatureBlock';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import './WhatsNewSection.css';

export default function WhatsNewSection() {
  return (
    <section id="whats-new" className="whats-new">
      <ScrollReveal as="h2" className="whats-new__heading">
        {whatsNewIntro.heading}
      </ScrollReveal>
      <ScrollReveal as="p" className="whats-new__subheading" delayMs={100}>
        {whatsNewIntro.subheading}
      </ScrollReveal>
      <div className="whats-new__grid">
        {features.map((feature, index) => (
          <FeatureBlock key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
