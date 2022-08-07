import { City } from '../../types/offer';
import {setCity} from '../../store/action';
import {useAppDispatch} from '../../hooks';


type CitiesListProps = {
 cities: City[];
 selectedCity: City | undefined;

};

function CitiesList({cities, selectedCity}: CitiesListProps): JSX.Element {

  const dispatch = useAppDispatch();

  // const cityNameClickHandler = (evt: MouseEvent<HTMLElement>) => {
  //   evt.preventDefault();
  //   onCityNameClick(evt.currentTarget.textContent);
  // };

  // const citiNames = cities.map((city) => city.name);


  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key = {city.name}>
            <a className ={`locations__item-link tabs__item ${selectedCity && city.name === selectedCity.name ? 'tabs__item--active' : ''}`} href="/#" >
              <div onClick = {()=>dispatch(setCity(city))}>{city.name}</div>
            </a>
          </li>))}
      </ul>
    </section>
  );

}


export default CitiesList;
