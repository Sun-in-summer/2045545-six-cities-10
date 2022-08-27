
import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';


type PlaceCardsListProps = {
  offers: Offers;
  isOfferScreen?: boolean
};


function PlaceCardsList({offers, isOfferScreen}: PlaceCardsListProps): JSX.Element {


  return (
    <div className="cities__places-list places__list tabs__content" >
      {offers.map((offer) =>
        (
          <PlaceCard
            offer = {offer}
            key= {offer.id}
            isOfferScreen= {isOfferScreen}
          />
        )
      )}
    </div>
  );

}

export default PlaceCardsList;
