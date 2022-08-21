
import { useEffect, useState } from 'react';
import FavoritesEmpty from '../../components/favorites/favorites-empty';
import FavoritesFilled from '../../components/favorites/favorites-filled';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
import { getFavoriteOffersData, getFavoriteOffersLoadingStatus } from '../../store/data-process/selector';

import { Offers } from '../../types/offer';
import LoadingScreen from '../loading-screen/loading-screen';


function FavoritesScreen(): JSX.Element {
  const [isFavoritesLoaded, setFavoritesLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isFavoritesOffersLoading = useAppSelector(getFavoriteOffersLoadingStatus);

  const favoriteOffers: Offers = useAppSelector(getFavoriteOffersData);


  useEffect(() => {
    if (isFavoritesLoaded) {
      return;
    }
    dispatch(fetchFavoriteOffersAction());
    setFavoritesLoaded(true);
  }, [dispatch, isFavoritesLoaded]
  );

  if (isFavoritesOffersLoading) {
    return (
      <LoadingScreen />
    );
  }

  const empty = favoriteOffers.length === 0;

  return (
    <div className= {`page ${empty ? 'page--favorites-empty' : ''}`}>
      <Header />
      { empty ? <FavoritesEmpty /> : <FavoritesFilled /> }
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
