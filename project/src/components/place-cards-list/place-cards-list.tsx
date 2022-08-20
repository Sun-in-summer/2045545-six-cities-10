import {Offers} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import { useState, MouseEvent } from 'react';


type PlaceCardsListProps = {
  offers: Offers;
  onListItemHover?: (listItemName: string) => void
};


function PlaceCardsList({offers, onListItemHover}: PlaceCardsListProps): JSX.Element {

  const listItemHoverHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (onListItemHover) {
      onListItemHover(evt.currentTarget.id);
    }
  };

  const [activeCardId, setActiveCardId] = useState< number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content" >
      {offers.map((offer) =>
        (
          <PlaceCard
            offer = {offer}
            key= {offer.id}
            isActive = {offer.id === activeCardId}
            onHover = {()=>setActiveCardId(offer.id)}
            isFlex ={false}
            onMouseEnter = {listItemHoverHandler}
          />
        )
      )}
    </div>
  );

}

export default PlaceCardsList;
