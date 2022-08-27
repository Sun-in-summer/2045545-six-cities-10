
import { memo, useCallback } from 'react';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';


function HeaderNavNoAuth(): JSX.Element {

  const dispatch = useAppDispatch();

  const handleHeaderNavLinkClick = useCallback((evt: { preventDefault: () => void; }) =>{
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Login));
  }, [dispatch]);


  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to = {AppRoute.Favorites} className="header__nav-link header__nav-link--profile" >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name"></span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            onClick = {handleHeaderNavLinkClick}
            to = {AppRoute.Main}
          >
            <span className="header__signout">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default memo(HeaderNavNoAuth);
