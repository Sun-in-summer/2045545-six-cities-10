import {Offers} from '../../types/offer';
import FavoritesEmpty from './favorites-empty';
import FavoritesFilled from './favorites-filled';


type FavoritesProps ={
  offers: Offers,
};

function Favorites({offers}: FavoritesProps) : JSX.Element {


  const favoriteOffers: Offers = offers.filter((offer)=> offer.isFavorite === true);
  const empty = !favoriteOffers.length;


  return (


    <main className={`page__main page__main--favorites ${empty ? 'page__main--favorites-empty' : ''}`}>
      <div className="page__favorites-container container">
        { empty ? <FavoritesEmpty /> : <FavoritesFilled offers ={offers}/> }
      </div>
    </main>

  );
}


export default Favorites;


