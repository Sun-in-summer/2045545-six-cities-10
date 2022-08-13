import {Routes, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector } from '../../hooks';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import {isCheckedAuth} from '../../index';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';


function App(): JSX.Element {

  const {authorizationStatus, isDataLoaded} = useAppSelector((state)=> state);


  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }


  return (
    <HistoryRouter history = {browserHistory}>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainScreen />}
        >
        </Route>
        <Route
          path ={AppRoute.Login}
          element = {<LoginScreen />}
        />
        <Route
          path ={AppRoute.Favorites}
          element = {<FavoritesScreen />}
        />
        <Route
          path = {AppRoute.Room}
          element = {
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <OfferScreen />
            </PrivateRoute>
          }
        />
        <Route
          path = {AppRoute.NotFound}
          element = {<NotFoundScreen/>}
        />
        <Route
          path = '*'
          element = {<NotFoundScreen/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
