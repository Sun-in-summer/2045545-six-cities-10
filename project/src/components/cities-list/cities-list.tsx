import {City} from '../../types/offer';
import CitiesListItem from '../city-list-item/cities-list-item';


type CitiesListProps = {
 cities: City[];
};

function CitiesList({cities}: CitiesListProps): JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <CitiesListItem
              key ={city.name}
              city ={city}
            />))}
        </ul>
      </section>
    </div>
  );

}

export default CitiesList;
