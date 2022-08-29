import { useAppSelector } from '../../hooks';
import { getSelectedCity } from '../../store/select-city-process/selector';


function MainEmpty(): JSX.Element {

  const selectedCity = useAppSelector(getSelectedCity);


  return (
    <div className='cities__places-container container  cities__places-container--empty'>
      <section className='cities__no-places'>
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in{selectedCity?.name}</p>
        </div>
      </section>
      <div className = "cities__right-section"></div>
    </div>


  );
}

export default MainEmpty;
