
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction, fetchSelectedOfferAction} from '../../store/api-actions';

import { useCallback, useEffect} from 'react';
import { getSelectedOfferData } from '../../store/data-process/selector';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AppRoute, AuthorizationStatus} from '../../const';
import { Offer } from '../../types/offer';
import { setActiveCardId } from '../../store/data-process/data-process';


function FavoriteButton(): JSX.Element {

  const {id} = useParams() ;
  const selectedOffer = useAppSelector(getSelectedOfferData);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    isFavorite
  } = selectedOffer as Offer ;

  const handleFavoriteButtonClick = useCallback(() =>{
    if ( authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    else {
      dispatch(changeFavoriteStatusAction({
        id: Number(id),
        status: Number(!isFavorite).toString(),
      }));

    }
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);

  useEffect(() => {
    if(!selectedOffer || selectedOffer.id !== Number(id)) {
      dispatch(fetchSelectedOfferAction(id as string));
    }
    dispatch(setActiveCardId(id));
  }, [dispatch, id, selectedOffer]);


  return (

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


  );
}

export default FavoriteButton;
