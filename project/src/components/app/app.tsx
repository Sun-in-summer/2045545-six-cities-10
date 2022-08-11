import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import {Offers} from '../../types/offer';
import {Reviews} from '../../types/reviews';

import { isCheckedAuth } from '../..';


type AppScreenProps = {

  reviews: Reviews;

}

function App({reviews}: AppScreenProps): JSX.Element {

  const {authorizationStatus, isDataLoaded} = useAppSelector((state)=> state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainScreen offers={offers} />}
        >
        </Route>
        <Route
          path ={AppRoute.Login}
          element = {<LoginScreen />}
        />
        <Route
          path ={AppRoute.Favorites}
          element = {<FavoritesScreen offers = {offers}/>}
        />
        <Route
          path = {AppRoute.Room}
          element = {
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <OfferScreen offers ={offers} reviews= {reviews}/>
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
    </BrowserRouter>
  );
}

export default App;
