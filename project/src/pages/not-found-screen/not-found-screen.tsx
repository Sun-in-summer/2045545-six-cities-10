import Header from '../../components/header/header';
import {Link} from 'react-router-dom';


function NotFoundScreen(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Header isLoginPage={false}/>
      <section className="not-found__no-page">
        <div className="not found__status-wrapper tabs__content">
          <img className ="not-found__picture" src='img/not-found.png' alt="error 404"/>
          <p className="not-found__status">Page not found</p>
          <Link to='/' className="not-found__status-description">Return to the homepage</Link>
        </div>
      </section>
    </div>
  );
}

export default NotFoundScreen;
