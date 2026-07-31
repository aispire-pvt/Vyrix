import { useScrollAnimation } from '../../controllers/useScrollAnimation.jsx';
import iconAiIntegration from '../../assets/images/icon-ai-integration.svg';
import iconReworkedRepository from '../../assets/images/icon-reworked-repository.svg';
import iconFreshLook from '../../assets/images/icon-fresh-look.svg';
import iconOtherFeatures from '../../assets/images/icon-other-features.svg';
import './FeatureBlock.css';

const featureIcons = {
  'ai-integration': iconAiIntegration,
  'reworked-repository': iconReworkedRepository,
  'fresh-look': iconFreshLook,
  'other-features': iconOtherFeatures,
};

export default function FeatureBlock({ feature, index = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  const icon = featureIcons[feature.id];
  const isReverse = index % 2 !== 0;

  const className = [
    'feature-block',
    isReverse ? 'feature-block--reverse' : '',
    isVisible ? 'feature-block--visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article ref={ref} className={className} style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="feature-block__icon">
        <img src={icon} alt="" aria-hidden="true" />
      </div>
      <div className="feature-block__text">
        <h3 className="feature-block__heading">{feature.heading}</h3>
        {feature.intro && <p className="feature-block__intro">{feature.intro}</p>}
        <ol className="feature-block__list">
          {feature.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}
