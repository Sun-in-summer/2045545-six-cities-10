
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';


function HeaderNavNoAuth(): JSX.Element {

  const {userEmail} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();


  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to = '/favorite' className="header__nav-link header__nav-link--profile" >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            onClick = {(evt)=>{
              evt.preventDefault();
              dispatch(redirectToRoute(AppRoute.Login));
            }}
            to = '/'
          >
            <span className="header__signout">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavNoAuth;
