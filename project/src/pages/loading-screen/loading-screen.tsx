
import styles from '../loading-screen/loading-screen.module.css';
import { RingLoader } from 'react-spinners';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.loaderContainer}>
      <h1 > Loading...</h1>
      <RingLoader
        size = {80}
        color = {'#4481c3'}
      />
    </div>


  );
}

export default LoadingScreen;

