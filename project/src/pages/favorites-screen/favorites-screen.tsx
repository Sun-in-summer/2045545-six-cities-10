import Header from '../../components/header/header';
import Favorites from '../../components/favorites/favorites';
import { useAppSelector } from '../../hooks';


function FavoritesScreen(): JSX.Element {

  const {offers} = useAppSelector((state) => state);


  return (
    <div className="page page--favorites-empty" >
      <Header />

      <Favorites offers={offers}/>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
