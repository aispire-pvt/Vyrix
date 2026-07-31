import { useScrollAnimation } from '../../controllers/useScrollAnimation.jsx';
import './ScrollReveal.css';

export default function ScrollReveal({ as: Tag = 'div', className = '', delayMs = 0, children, ...rest }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
