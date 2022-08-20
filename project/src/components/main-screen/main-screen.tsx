import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppSelector} from '../../hooks';
import MainEmpty from '../../components/main-empty/main-empty';
import MainFilled from '../../components/main-filled/main-filled';
import { CITIES } from '../../const';
import { getOffersData } from '../../store/offers-data/selector';
import { getSelectedCity } from '../../store/select-city-process/selector';


function MainBlock(): JSX.Element {


  const offers = useAppSelector(getOffersData);
  const selectedCity = useAppSelector(getSelectedCity);
  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity.name);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${selectedCityOffers ? '' : 'page__main--index--empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        < CitiesList
          cities = {CITIES}
        />
        <div className="cities">
          {selectedCityOffers.length === 0 ?
            < MainEmpty selectedCity ={selectedCity}/> :
            <MainFilled />}
        </div>
      </main>
    </div>
  );
}

export default MainBlock;
