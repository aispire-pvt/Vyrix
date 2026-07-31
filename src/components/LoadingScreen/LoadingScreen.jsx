import { loadingConfig } from '../../models/loadingModel';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-screen__mark">
        <span className="loading-screen__ring" />
        <span className="loading-screen__brand">{loadingConfig.brandName}</span>
      </div>
    </div>
  );
}
