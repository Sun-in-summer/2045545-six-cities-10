
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNearByOffersData, getNearByOffersLoadingStatus } from '../../store/data-process/selector';
import { useEffect } from 'react';
import { fetchNearByOffersAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';


function NearByOffers(): JSX.Element {

  const nearByOffers = useAppSelector(getNearByOffersData);

  const isNearByOfferLoading = useAppSelector(getNearByOffersLoadingStatus);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (nearByOffers.length === 0 && !isNearByOfferLoading) {
      dispatch(fetchNearByOffersAction(id as string));
    }
  }, [dispatch, id, isNearByOfferLoading, nearByOffers]);


  return (

    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          <PlaceCardsList isOfferScreen/>
        </div>
      </section>
    </div>

  );
}

export default NearByOffers;


