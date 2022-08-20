

import {Offers} from '../../types/offer';
import { groupByCity } from '../../utils/utils';
import FavoritesBlock from '../favorites-block/favorites-block';


type FavoritesFilledProps = {
  offers: Offers;
}

function FavoritesFilled({offers} : FavoritesFilledProps) : JSX.Element {


  const favoriteOffers: Offers = offers.filter((offer)=> offer.isFavorite === true);
  const offersByCity = groupByCity(favoriteOffers);
  const listOfFavoriteCities = Object.keys(offersByCity);

  return (
    <main className= "page__main page__main--favorites ">
      <div className="page__favorites-container container">
        <section className ='favorites'>
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {listOfFavoriteCities.map((city) => ( < FavoritesBlock offersByCity ={offersByCity[city]} city = {city} key = {city}/>))}
          </ul>
        </section>
      </div>
    </main>

  );

}


export default FavoritesFilled;


