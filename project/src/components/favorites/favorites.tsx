import {Offers} from '../../types/offer';
import { groupByCity } from '../../utils/utils';
import FavoritesBlock from '../favorites-block/favorites-block';

type FavoritesProps ={
  offers: Offers,
};

function Favorites({offers}: FavoritesProps) : JSX.Element {


  const favoriteOffers: Offers = offers.filter((offer)=> offer.isFavorite === true);

  // const offersByCity = favoriteOffers.slice().reduce<GroupedOffersByOneCity>((acc, offer ) => {
  //   if (!Object.hasOwn(acc, offer.city.name)) {
  //     acc[offer.city.name] = [];
  //   }
  //   acc[offer.city.name].push(offer);
  //   return acc;
  // }, {});

  const offersByCity = groupByCity(favoriteOffers);


  const listOfFavoriteCities = Object.keys(offersByCity);


  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {listOfFavoriteCities.map((city) => ( < FavoritesBlock offersByCity ={offersByCity[city]} city = {city} key = {city}/>))}
      </ul>
    </section>);

}


export default Favorites;


