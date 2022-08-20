import Header from '../../components/header/header';
import OfferDetails from '../../components/offer-details/offer-details';
import NearByOffers from '../../components/near-by-offers/near-by-offers';


function OfferScreen(): JSX.Element {


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
