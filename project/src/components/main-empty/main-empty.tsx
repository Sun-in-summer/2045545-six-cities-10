import { City } from '../../types/offer';


type MainEmptyProps = {
  selectedCity: City;
}

function MainEmpty( {selectedCity} : MainEmptyProps): JSX.Element {


  return (
    <div className='cities__places-container container  cities__places-container--empty'>
      <section className='cities__no-places'>
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in{selectedCity.name}</p>
        </div>
      </section>
    </div>

  );
}

export default MainEmpty;
