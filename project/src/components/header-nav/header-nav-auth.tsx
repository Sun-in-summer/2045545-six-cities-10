
import {Link} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {logoutAction} from '../../store/api-actions';


function HeaderNavAuth(): JSX.Element {

  const {offers} = useAppSelector((state) => state);
  const {userEmail} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const favoritesOffers = offers.filter((offer)=> offer.isFavorite === true);

  console.log(userEmail);


  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to = '/favorites' className="header__nav-link header__nav-link--profile" >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className="header__favorite-count">{favoritesOffers.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            onClick = {(evt)=>{
              evt.preventDefault();
              dispatch(logoutAction());
            }}
            to = '/'
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavAuth;
