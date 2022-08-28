import {City} from '../../types/offer';
import {setSelectedCity} from '../../store/select-city-process/select-city-process';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { getSelectedCity } from '../../store/select-city-process/selector';


type CitiesListItemProps = {
  city: City;
};

function CitiesListItem({city}: CitiesListItemProps): JSX.Element {

  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getSelectedCity);


  return (

    <li className="locations__item" key = {city.name}>
      <a
        className ={`locations__item-link tabs__item ${selectedCity && city.name === selectedCity.name ? 'tabs__item--active' : ''}`} href="/#"
      >
        <div
          onClick = {()=>dispatch(setSelectedCity(city))}
        >
          {city.name}
        </div>
      </a>
    </li>

  );
}

export default CitiesListItem;
