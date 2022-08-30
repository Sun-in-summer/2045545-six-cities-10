import { Fragment } from 'react';
import { Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type FavoritesBlockProps = {
  offersByCity: Offer[],
  city: string,
};

function FavoritesBlock({offersByCity, city}: FavoritesBlockProps): JSX.Element {


  return (
    <Fragment>

      {
        offersByCity.map((exactOffer, index) => (
          <li className="favorites__locations-items" key = {exactOffer.id}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                {index === 0 ? <a className="locations__item-link" href="/#"><span>{city}</span></a> : null}
              </div>
            </div>
            <div className="favorites__places">
              <PlaceCard
                offer = {exactOffer}
                key= {exactOffer.id}
                isFlex
              />
            </div>
          </li>


        ))
      }
    </Fragment>
  );

}


export default FavoritesBlock;

