import {Offer} from '../../types/offer';
import {NavLink, useNavigate} from 'react-router-dom';
import {ratingPercentage} from '../../utils/utils';
import {MouseEventHandler} from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selector';


type PlaceCardProps = {
  offer: Offer;
  isActive: boolean,
  onHover: ()=>void,
  isFlex: boolean,
  onMouseEnter?: MouseEventHandler<HTMLHeadingElement> | undefined,
};

function PlaceCard(props: PlaceCardProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const {offer, isActive, onHover, isFlex, onMouseEnter} = props;
  const {
    id,
    previewImage,
    title,
    isFavorite,
    isPremium,
    rating,
    type,
    price,
    description,
  } = offer;


  const starWidth: number = ratingPercentage(rating);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleFavoriteButtonClick = () =>{
    if ( authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    else {
      dispatch(changeFavoriteStatusAction({
        id: id,
        status: Number(!isFavorite).toString(),
        isFavorite: !isFavorite
      }));
    }
  };


  return (
    <article
      className= "cities__card place-card"
      onMouseOver = {onHover}
      style = {{display : `${isFlex ? 'flex' : 'block'}`, width: `${isFlex ? '421px' : '260px'}` }}
      id = {id.toString()}
      onMouseEnter ={onMouseEnter}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : null }
      <div
        className="cities__image-wrapper place-card__image-wrapper "
        style = {{minWidth: `${isFlex ? '150px' : ''}`, marginRight: `${isFlex ? '16px' : ''}` }}
      >
        <a href="/#">
          <img
            className={`place-card__image ${ isActive ? 'place-card__image--active' : null}` }
            src={previewImage}
            width={isFlex ? '150px' : '260px'}
            height="200"
            alt={description}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''}  button`}
            type="button"
            onClick = {handleFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${starWidth}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          className="place-card__name"
        >
          <NavLink
            to={AppRoute.Room.replace(':id', id.toString())}
          >
            {title}
          </NavLink>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
