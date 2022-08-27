import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

import { getFavoriteOffersData, getFavoriteOffersLoadingStatus, } from '../../store/data-process/selector';
import { getUserInfo } from '../../store/user-process/selector';


function HeaderUserInfo(): JSX.Element {


  const isFavoritesOffersLoading = useAppSelector(getFavoriteOffersLoadingStatus);


  const userInfo = useAppSelector(getUserInfo) ;
  let userEmail = '';
  if (userInfo ) {
    userEmail = userInfo.email;
  }

  const favoriteOffers: number | string = useAppSelector(getFavoriteOffersData).length;


  if (isFavoritesOffersLoading) {
    return (
      <LoadingScreen />
    );
  }


  return (

    <li className="header__nav-item user">
      <Link to = {AppRoute.Favorites} className="header__nav-link header__nav-link--profile" >
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">{userEmail}</span>
        <span className="header__favorite-count">{favoriteOffers}</span>
      </Link>
    </li>

  );
}

export default HeaderUserInfo;
