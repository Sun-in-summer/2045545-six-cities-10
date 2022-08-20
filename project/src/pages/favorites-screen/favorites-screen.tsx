import FavoritesEmpty from '../../components/favorites/favorites-empty';
import FavoritesFilled from '../../components/favorites/favorites-filled';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getOffersData } from '../../store/offers-data/selector';
import { Offers } from '../../types/offer';


function FavoritesScreen(): JSX.Element {

  const offers = useAppSelector(getOffersData);
  const favoriteOffers: Offers = offers.filter((offer)=> offer.isFavorite === true);
  const empty = !favoriteOffers.length;


  return (
    <div className= {`page ${empty ? 'page--favorites-empty' : ''}`}>
      <Header />
      { empty ? <FavoritesEmpty /> : <FavoritesFilled offers ={offers}/> }
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
