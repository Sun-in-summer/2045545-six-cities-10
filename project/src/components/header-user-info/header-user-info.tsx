import {Link} from 'react-router-dom';
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

  // const favoritesOffers = offers.filter((offer)=> offer.isFavorite === true);
  // const offers = useAppSelector(getOffersData);

  let secondOffers: number | string = useAppSelector(getFavoriteOffersData).length;


  secondOffers = useAppSelector(getFavoriteOffersData).length;


  if (isFavoritesOffersLoading) {
    return (
      <LoadingScreen />
    );
  }


  return (

    <li className="header__nav-item user">
      <Link to = '/favorites' className="header__nav-link header__nav-link--profile" >
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">{userEmail}</span>
        {/* <span className="header__favorite-count">{favoritesOffers.length}</span> */}
        <span className="header__favorite-count">{secondOffers}</span>
      </Link>
    </li>

  );
}

export default HeaderUserInfo;
