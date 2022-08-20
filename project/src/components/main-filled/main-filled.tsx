import {Offer} from '../../types/offer';
import Map from '../../components/map/map';
import {DEFAULT_MAP_WIDTH} from '../../const';
import {useState } from 'react';
import {useAppSelector} from '../../hooks';
import {getSortedOffers} from '../../utils/utils';
import SortOptionsList from '../sort-options-list/sort-options-list';
import PlaceCardsList from '../place-cards-list/place-cards-list';
import { getOffersData } from '../../store/offers-data/selector';
import { getSelectedCity } from '../../store/select-city-process/selector';
import { getActiveSortOption } from '../../store/select-sort-option-process/selector';


function MainFilled(): JSX.Element {

  const offers = useAppSelector(getOffersData);
  const selectedCity = useAppSelector(getSelectedCity);
  const activeSortOption = useAppSelector(getActiveSortOption);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);


  const onListItemHover = (listItemName: string) => {
    const currentOffer = offers.find((offer) =>
      offer.id.toString() === listItemName,
    );
    setSelectedOffer(currentOffer);
  };

  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
  const sortedCityOffers = getSortedOffers(activeSortOption, selectedCityOffers);


  console.log(offers);


  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{selectedCityOffers.length} places to stay in {selectedCity.name}</b>
        <SortOptionsList />
        <PlaceCardsList
          offers = {sortedCityOffers}
          onListItemHover = {onListItemHover}
        />
      </section>
      <div className="cities__right-section">
        {selectedCityOffers.length === 0 ?
          '' :
          <section className="cities__map map">
            < Map
              city ={selectedCity}
              offers={selectedCityOffers}
              selectedOffer ={selectedOffer}
              width={DEFAULT_MAP_WIDTH}
            />
          </section>}
      </div>
    </div>

  );
}

export default MainFilled;


