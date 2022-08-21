import ReviewForm from '../../components/feedback-form/feedback-form';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {ratingPercentage, firstLetterToUpperCase} from '../../utils/utils';
import FeedbacksList from '../../components/feedbacks-list/feedbacks-list';
import OfferImages from '../../components/offer-images/offer-images';
import OfferGoods from '../../components/offer-goods/offer-goods';
import { AppRoute, AuthorizationStatus, MAP_WIDTH_IN_OFFER } from '../../const';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction, fetchSelectedOfferAction, fetchNearByOffersAction, addToFavoritesAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { getOffersData , getReviewsData, getSelectedOfferLoadingStatus} from '../../store/data-process/selector';
import OfferHost from '../offer-host/offer-host';
import LoadingScreen from '../../pages/loading-screen/loading-screen';


function OfferDetails(): JSX.Element {


  const {id} = useParams() ;
  const dispatch = useAppDispatch();

  const isSelectedOfferLoading = useAppSelector(getSelectedOfferLoadingStatus);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchSelectedOfferAction(id));
      dispatch(fetchReviewsAction(id));
      dispatch(fetchNearByOffersAction(id));
      window.scrollTo(0,0);
    }
  }, [dispatch, id]);


  const offers = useAppSelector(getOffersData);

  const selectedOffer = offers.find((offer) => offer.id === Number(id));
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getReviewsData);

  const navigate = useNavigate();
  const handleFavoriteButtonClick = () =>{
    if ( authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    else {
      dispatch(addToFavoritesAction({
        id: Number(id),
        status: Number(!isFavorite).toString(),
        isFavorite: !isFavorite
      }));
    }
  };

  if ( isSelectedOfferLoading) {
    return (
      <LoadingScreen />
    );
  }


  if (!selectedOffer) {
    return <Navigate to={AppRoute.NotFound} />;
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
    host,
    description,
    isFavorite
  } = selectedOffer ;

  const starWidth = ratingPercentage(rating);
  const firstLetterCapitalizedType = firstLetterToUpperCase(type);
  const mapWidth = MAP_WIDTH_IN_OFFER;


  return (

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
          <OfferHost host = {host} description ={description} />
          <section className="property__reviews reviews">
            <FeedbacksList reviews ={reviews}/>
            {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
          </section>
        </div>
      </div>
      <section className="property__map map">
        <Map
          selectedOffer ={selectedOffer }
          width = {mapWidth}
        />
      </section>
    </section>

  );
}

export default OfferDetails;
