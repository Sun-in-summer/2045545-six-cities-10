import Header from '../../components/header/header';
import ReviewForm from '../../components/feedback-form/feedback-form';
import {Navigate, useParams} from 'react-router-dom';
import {ratingPercentage, firstLetterToUpperCase} from '../../utils/utils';
import FeedbacksList from '../../components/feedbacks-list/feedbacks-list';
import OfferImages from '../../components/offer-images/offer-images';
import OfferGoods from '../../components/offer-goods/offer-goods';
import { AppRoute, AuthorizationStatus, MAP_WIDTH_IN_OFFER, NEAR_ITEMS_QUANTITY } from '../../const';
import Map from '../../components/map/map';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchReviewsAction, fetchSelectedOffer, fetchNearByOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';


function OfferScreen(): JSX.Element {

  const {offers} = useAppSelector((state) => state);
  const {authorizationStatus} = useAppSelector((state) => state);
  const {id} = useParams();
  const {selectedOffer} = useAppSelector((state)=> state);
  const {nearByOffers} = useAppSelector((state) => state);

  useEffect(() => {
    if (id !== undefined) {
      store.dispatch(fetchSelectedOffer(id));
      store.dispatch(fetchReviewsAction(id));
      store.dispatch(fetchNearByOffersAction(id));
    }
  }, [id]);


  if (selectedOffer === undefined) {
    return <Navigate to={AppRoute.NotFound} />;
  }


  const {isPremium, images, title, rating, type, maxAdults, bedrooms, price, goods, host, description} = selectedOffer ;
  const starWidth = ratingPercentage(rating);
  const firstLetterCapitalizedType = firstLetterToUpperCase(type);
  const mapWidth = MAP_WIDTH_IN_OFFER;

  const nearOffers = nearByOffers.slice(0, NEAR_ITEMS_QUANTITY);


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
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
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
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host?.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host?.name}
                  </span>
                  <span className="property__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <FeedbacksList offerId = {selectedOffer.id.toString()}/>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={selectedOffer.city}
              offers ={offers}
              selectedOffer ={selectedOffer }
              width = {mapWidth}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCardsList offers = {nearOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
