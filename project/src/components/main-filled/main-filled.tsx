import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks';
import SortOptionsList from '../sort-options-list/sort-options-list';
import PlaceCardsList from '../place-cards-list/place-cards-list';
import { getSelectedCity } from '../../store/select-city-process/selector';
import useSelectedCityOffers from '../../hooks/useSelectedCityOffers/useSelectedCityOffers';


function MainFilled(): JSX.Element {

  const selectedCity = useAppSelector(getSelectedCity);
  const selectedCityOffers = useSelectedCityOffers();

  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{selectedCityOffers.length} places to stay in {selectedCity.name}</b>
        <SortOptionsList />
        <PlaceCardsList />
      </section>
      <div className="cities__right-section">
        {selectedCityOffers.length === 0 ?
          '' :
          <section className="cities__map map">
            < Map />
          </section>}
      </div>
    </div>

  );
}

export default MainFilled;


