import CitiesList from '../cities-list/cities-list';
import {useAppSelector} from '../../hooks';
import MainEmpty from '../main-empty/main-empty';
import MainFilled from '../main-filled/main-filled';
import { CITIES } from '../../const';
import { getOffersData } from '../../store/data-process/selector';
import { getSelectedCity } from '../../store/select-city-process/selector';


function MainBlock(): JSX.Element {


  const offers = useAppSelector(getOffersData);
  const selectedCity = useAppSelector(getSelectedCity);
  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity.name);

  return (

    <main className={`page__main page__main--index ${selectedCityOffers ? '' : 'page__main--index--empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      < CitiesList
        cities = {CITIES}
      />
      <div className="cities">
        {selectedCityOffers.length === 0 ?
          < MainEmpty /> :
          <MainFilled />}
      </div>
    </main>

  );
}

export default MainBlock;
