import { NEAR_ITEMS_QUANTITY } from '../../const';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import { useAppSelector } from '../../hooks';
import { getNearByOffersData } from '../../store/data-process/selector';


function NearByOffers(): JSX.Element {

  const nearByOffers = useAppSelector(getNearByOffersData);
  const nearOffers = nearByOffers.slice(0, NEAR_ITEMS_QUANTITY);


  return (

    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          <PlaceCardsList offers = {nearOffers} />
        </div>
      </section>
    </div>

  );
}

export default NearByOffers;
