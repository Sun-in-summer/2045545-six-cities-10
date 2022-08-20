
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import HeaderNavAuth from './header-nav-auth';
import HeaderNavNoAuth from './header-nav-no-auth';


function HeaderNav(): JSX.Element {


  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? <HeaderNavAuth /> : <HeaderNavNoAuth/>}
      </ul>
    </nav>
  );
}

export default HeaderNav;
