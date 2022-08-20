import { useAppSelector } from '../../hooks';
import '.error-message.css';
import { getErrorInfo } from '../../store/offers-data/selector';

function ErrorMessage(): JSX.Element |null {
  const error = useAppSelector(getErrorInfo);
  return (error)
    ? <div className = 'error-message'>{error}</div>
    : null;
}

export default ErrorMessage;
