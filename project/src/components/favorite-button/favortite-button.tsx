
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavoriteStatusAction} from '../../store/api-actions';

import { useCallback} from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { AppRoute, AuthorizationStatus} from '../../const';

type FavoriteButtonProps = {
  id: string | undefined,
  isFavorite: boolean,
}


function FavoriteButton( {id, isFavorite}: FavoriteButtonProps): JSX.Element {


  const authorizationStatus = useAppSelector(getAuthorizationStatus);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleFavoriteButtonClick = useCallback(() =>{
    if ( authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    else {
      dispatch(changeFavoriteStatusAction({
        id: Number(id),
        status: !isFavorite,
      }));

    }
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);


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
