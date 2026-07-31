import { useLoadingState } from './controllers/useLoadingState.jsx';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import LandingPageView from './views/LandingPageView';

function App() {
  const isLoading = useLoadingState();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <LandingPageView />
    </>
  );
}

export default App;
