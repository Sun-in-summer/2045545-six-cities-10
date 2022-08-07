import Header from '../../components/header/header';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import {Offers, Offer} from '../../types/offer';
import Map from '../../components/map/map';
import {DEFAULT_MAP_WIDTH, CITIES} from '../../const';
import { useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks';


type MainScreenProps = {
  offers: Offers,
}

function MainScreen({offers}: MainScreenProps): JSX.Element {

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  // const [selectedCity, setSelectedCity] = useState <City> (DEFAULT_CITY);

  // const onCityNameClick = (cityName: string | null) => {
  //   const currentCity = CITIES.find((city) =>
  //     city.name === cityName,
  //   );
  //   if (currentCity) {
  //     setSelectedCity(currentCity);
  //   }

  // };

  const selectedCity = useAppSelector((state) => state.city);


  const onListItemHover = (listItemName: string) => {
    const currentOffer = offers.find((offer) =>
      offer.id.toString() === listItemName,
    );
    setSelectedOffer(currentOffer);
  };


  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity.name);


  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          < CitiesList cities = {CITIES} selectedCity = {selectedCity} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in {selectedCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex= {0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options">
                  <li className="places__option places__option--active" tabIndex={0} >Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlaceCardsList offers = {selectedCityOffers} onListItemHover = {onListItemHover} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">< Map location ={selectedCity.location} offers={selectedCityOffers} selectedOffer ={selectedOffer} width={DEFAULT_MAP_WIDTH}/></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
