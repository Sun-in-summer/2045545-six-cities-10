import {City} from '../../types/offer';
import {setSelectedCity} from '../../store/select-city-process/select-city-process';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { getSelectedCity } from '../../store/select-city-process/selector';
import { Link } from 'react-router-dom';


type CitiesListItemProps = {
  city: City;
};

function CitiesListItem({city}: CitiesListItemProps): JSX.Element {

  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(getSelectedCity);

  const handleCityNameClick = () =>{
    dispatch(setSelectedCity(city));
  };


  return (

    <li className="locations__item" key = {city.name}>
      <Link
        className ={`locations__item-link tabs__item ${selectedCity && city.name === selectedCity.name ? 'tabs__item--active' : ''}`}
        to=''
        onClick = {handleCityNameClick}
      >
        <div >
          {city.name}
        </div>
      </Link>
    </li>

  );
}

export default CitiesListItem;
