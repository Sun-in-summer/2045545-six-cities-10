
import { memo, useCallback } from 'react';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/api-actions';
import HeaderUserInfo from '../header-user-info/header-user-info';


function HeaderNavAuth(): JSX.Element {

  const dispatch = useAppDispatch();
  const handleHeaderNavLinkClick = useCallback((evt: { preventDefault: () => void; })=>{
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <HeaderUserInfo />
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            onClick = {handleHeaderNavLinkClick}
            to = {AppRoute.Main}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default memo(HeaderNavAuth);
