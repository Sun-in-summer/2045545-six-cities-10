import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';


type PlaceCardsListProps = {
  offers: Offers;
  onListItemHover?: (listItemName: string) => void
};


function PlaceCardsList({offers, onListItemHover}: PlaceCardsListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content" >
      {offers.map((offer) =>
        (
          <PlaceCard
            offer = {offer}
            key= {offer.id}
            // isActive = {offer.id === activeCardId}
            isFlex ={false}

          />
        )
      )}
    </div>
  );

}

export default PlaceCardsList;
