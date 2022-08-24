import Header from '../../components/header/header';
import NearByOffers from '../../components/near-by-offers/near-by-offers';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction, fetchNearByOffersAction, fetchSelectedOfferAction } from '../../store/api-actions';
import OfferHost from '../../components/offer-host/offer-host';
import { useEffect} from 'react';
import { getErrorLoadingStatus, getSelectedOfferData } from '../../store/data-process/selector';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AppRoute, AuthorizationStatus, MAP_WIDTH_IN_OFFER } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import { firstLetterToUpperCase, ratingPercentage } from '../../utils/utils';
import OfferImages from '../../components/offer-images/offer-images';
import OfferGoods from '../../components/offer-goods/offer-goods';
import FeedbacksList from '../../components/feedbacks-list/feedbacks-list';
import FeedbackForm from '../../components/feedback-form/feedback-form';
import Map from '../../components/map/map';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { Offer } from '../../types/offer';
import { setActiveCardId } from '../../store/data-process/data-process';


function OfferScreen(): JSX.Element {


  const {id} = useParams() ;
  const isErrorLoading = useAppSelector(getErrorLoadingStatus);
  const dispatch = useAppDispatch();
  const selectedOffer = useAppSelector(getSelectedOfferData);


  useEffect(() => {
    if(!selectedOffer || selectedOffer.id !== Number(id)) {
      dispatch(fetchSelectedOfferAction(id as string));
      dispatch(fetchNearByOffersAction(id as string));
    }
    dispatch(setActiveCardId(id));
  }, [dispatch, id, selectedOffer]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  const navigate = useNavigate();
  const handleFavoriteButtonClick = () =>{
    if ( authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    else {
      dispatch(changeFavoriteStatusAction({
        id: Number(id),
        status: Number(!isFavorite).toString(),
        isFavorite: !isFavorite
      }));
    }
  };

  if (!selectedOffer && !isErrorLoading) {
    return <LoadingScreen />;
  }

  if (!selectedOffer && isErrorLoading) {
    return (
      <NotFoundScreen />
    );
  }

  const {
    isPremium,
    images,
    title,
    rating,
    type,
    maxAdults,
    bedrooms,
    price,
    goods,
    isFavorite
  } = selectedOffer as Offer ;

  const starWidth = ratingPercentage(rating);
  const firstLetterCapitalizedType = firstLetterToUpperCase(type);
  const mapWidth = MAP_WIDTH_IN_OFFER;


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <OfferImages selectedOfferImages={images} />
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : null }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''}  button`}
                  type="button"
                  onClick= {handleFavoriteButtonClick}
                >
                  <svg className={`property__bookmark-icon${isFavorite ? '--active' : ''}`}width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${starWidth}% `}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {firstLetterCapitalizedType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} Adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <OfferGoods goods= {goods}/>
              <OfferHost />
              <section className="property__reviews reviews">
                <FeedbacksList />
                {authorizationStatus === AuthorizationStatus.Auth && <FeedbackForm />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              // selectedOffer ={selectedOffer }
              width = {mapWidth}
              isOfferScreen
            />
          </section>
        </section>
        <NearByOffers />
      </main>
    </div>
  );
}

export default OfferScreen;
