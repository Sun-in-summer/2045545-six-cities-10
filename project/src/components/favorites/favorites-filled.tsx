

import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { getFavoriteOffersData, getFavoriteOffersLoadingStatus } from '../../store/data-process/selector';
import {Offers} from '../../types/offer';
import { groupByCity } from '../../utils/utils';
import FavoritesBlock from '../favorites-block/favorites-block';


function FavoritesFilled() : JSX.Element {

  const isFavoritesLoading = useAppSelector(getFavoriteOffersLoadingStatus);
  const favoriteOffers: Offers = useAppSelector(getFavoriteOffersData);
  const offersByCity = groupByCity(favoriteOffers);
  const listOfFavoriteCities = Object.keys(offersByCity);

  if ( isFavoritesLoading) {
    return (
      <LoadingScreen />
    );
  }

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


