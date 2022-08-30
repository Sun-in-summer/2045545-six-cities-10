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
import {isCheckedAuth} from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { getOffersDataLoadingStatus } from '../../store/data-process/selector';


function App(): JSX.Element {


  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getOffersDataLoadingStatus);


  if (isOffersLoading || isCheckedAuth(authorizationStatus) ) {
    return (
      <LoadingScreen />
    );
  }


  return (

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
        element = {
          <PrivateRoute >
            <FavoritesScreen />
          </PrivateRoute>
        }
      />
      <Route
        path = {AppRoute.Room}
        element = {<OfferScreen />}
      />
      <Route
        path = {AppRoute.NotFound}
        element = {<NotFoundScreen/>}
      />
      <Route
        path = {AppRoute.Other}
        element = {<NotFoundScreen/>}
      />
    </Routes>

  );
}

export default App;
