import Header from '../../components/header/header';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import {Offer} from '../../types/offer';
import Map from '../../components/map/map';
import {DEFAULT_MAP_WIDTH, CITIES} from '../../const';
import {Fragment, useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppSelector} from '../../hooks';
import SortOptionsList from '../../components/sort-options-list/sort-options-list';
import MainEmpty from '../../components/main-empty/main-empty';
import {getSortedOffers} from '../../utils/utils';


function MainScreen(): JSX.Element {

  const {offers} = useAppSelector((state) => state);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const selectedCity = useAppSelector((state) => state.city);
  const activeSortOption = useAppSelector((state) => state.activeSortOption);

  const onListItemHover = (listItemName: string) => {
    const currentOffer = offers.find((offer) =>
      offer.id.toString() === listItemName,
    );
    setSelectedOffer(currentOffer);
  };

  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity.name);
  const sortedCityOffers = getSortedOffers(activeSortOption, selectedCityOffers);


  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${selectedCityOffers && 'page__main--index--empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          < CitiesList
            cities = {CITIES}
            selectedCity = {selectedCity}
          />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${selectedCityOffers && 'cities__places-container--empty'}`}>
            <section className={selectedCityOffers.length === 0 ? 'cities__no-places' : 'cities__places places'}>
              {selectedCityOffers.length === 0 ?
                < MainEmpty/> :
                <Fragment>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{selectedCityOffers.length} places to stay in {selectedCity.name}</b>
                  <SortOptionsList />
                  <PlaceCardsList
                    offers = {sortedCityOffers}
                    onListItemHover = {onListItemHover}
                  />
                </Fragment>}
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
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
