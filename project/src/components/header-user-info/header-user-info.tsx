
import {Link} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getOffersData } from '../../store/data-process/selector';
import { getUserInfo } from '../../store/user-process/selector';


function HeaderUserInfo(): JSX.Element {

  const offers = useAppSelector(getOffersData);
  const userInfo = useAppSelector(getUserInfo) ;
  let userEmail = '';
  if (userInfo ) {
    userEmail = userInfo.email;
  }

  const favoritesOffers = offers.filter((offer)=> offer.isFavorite === true);


  return (

    <li className="header__nav-item user">
      <Link to = '/favorites' className="header__nav-link header__nav-link--profile" >
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">{userEmail}</span>
        <span className="header__favorite-count">{favoritesOffers.length}</span>
      </Link>
    </li>

  );
}

export default HeaderUserInfo;
