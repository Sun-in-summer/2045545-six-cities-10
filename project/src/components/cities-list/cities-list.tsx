import CitiesListItem from '../city-list-item/cities-list-item';
import { CITIES } from '../../const';
import { memo } from 'react';


function CitiesList(): JSX.Element {

  const cities = CITIES;

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

export default memo(CitiesList);
