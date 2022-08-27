import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks';
import {getSortedOffers} from '../../utils/utils';
import SortOptionsList from '../sort-options-list/sort-options-list';
import PlaceCardsList from '../place-cards-list/place-cards-list';
import { getOffersData } from '../../store/data-process/selector';
import { getSelectedCity } from '../../store/select-city-process/selector';
import { getActiveSortOption } from '../../store/select-sort-option-process/selector';
import useSelectedCityOffers from '../../hooks/useSelectedCityOffers/useSelectedCityOffers';


function MainFilled(): JSX.Element {

  // const offers = useAppSelector(getOffersData);
  const selectedCity = useAppSelector(getSelectedCity);
  const activeSortOption = useAppSelector(getActiveSortOption);
  // const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
  const selectedCityOffers = useSelectedCityOffers();
  const sortedCityOffers = getSortedOffers(activeSortOption, selectedCityOffers);


  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{selectedCityOffers.length} places to stay in {selectedCity.name}</b>
        <SortOptionsList />
        <PlaceCardsList
          offers = {sortedCityOffers}

        />
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


