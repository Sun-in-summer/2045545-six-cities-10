import Header from '../../components/header/header';
import OfferDetails from '../../components/offer-details/offer-details';
import NearByOffers from '../../components/near-by-offers/near-by-offers';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchSelectedOfferAction } from '../../store/api-actions';


function OfferScreen(): JSX.Element {
  const {id} = useParams() ;
  const dispatch = useAppDispatch();
  if (id!==undefined) {
    dispatch(fetchSelectedOfferAction(id));
  }


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <OfferDetails />
        <NearByOffers />
      </main>
    </div>
  );
}

export default OfferScreen;
