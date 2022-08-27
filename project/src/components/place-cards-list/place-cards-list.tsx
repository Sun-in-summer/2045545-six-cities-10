
import { useAppSelector } from '../../hooks';
import useSelectedCityOffers from '../../hooks/useSelectedCityOffers/useSelectedCityOffers';
import { getNearByOffersData } from '../../store/data-process/selector';
import { getActiveSortOption } from '../../store/select-sort-option-process/selector';
import { getSortedOffers } from '../../utils/utils';
import PlaceCard from '../place-card/place-card';
import { NEAR_ITEMS_QUANTITY } from '../../const';


type PlaceCardsListProps = {
  isOfferScreen?: boolean
};


function PlaceCardsList({isOfferScreen}: PlaceCardsListProps): JSX.Element {


  const activeSortOption = useAppSelector(getActiveSortOption);
  const selectedCityOffers = useSelectedCityOffers();
  const sortedCityOffers = getSortedOffers(activeSortOption, selectedCityOffers);
  const nearByOffers = useAppSelector(getNearByOffersData);
  const nearOffers = nearByOffers.slice(0, NEAR_ITEMS_QUANTITY);
  const finalOffers = isOfferScreen ? nearOffers : sortedCityOffers;


  return (
    <div className="cities__places-list places__list tabs__content" >
      {finalOffers.map((offer) =>
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
