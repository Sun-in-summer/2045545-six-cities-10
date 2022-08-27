import { useMemo } from 'react';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {

  const logo = useMemo(() =>
    (
      <Link
        to = {AppRoute.Main}
        className="header__logo-link"
      >
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
      </Link>), []);
  return logo;

}

export default Logo;
