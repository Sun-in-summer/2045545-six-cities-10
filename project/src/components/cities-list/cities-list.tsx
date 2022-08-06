import {MouseEvent} from 'react';

type CitiesListProps = {
 citiesNames: string[];
 selectedCityName: string | undefined;
 onCityNameClick: (cityName: string | null) => void;
};

function CitiesList({citiesNames, selectedCityName, onCityNameClick}: CitiesListProps): JSX.Element {

  const cityNameClickHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onCityNameClick(evt.currentTarget.textContent);
  };


  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {citiesNames.map((cityName) => (
          <li className="locations__item" key = {cityName}>
            <a className ={`locations__item-link tabs__item ${cityName === selectedCityName ? 'tabs__item--active' : ''}`} href="/#" >
              <div onClick = {cityNameClickHandler}>{cityName}</div>
            </a>
          </li>))}
      </ul>
    </section>
  );

}


export default CitiesList;
