import { memo } from 'react';
import {MAX_OFFER_IMAGE_QUANTITY} from '../../const';
import { useAppSelector } from '../../hooks';
import { getSelectedOfferData } from '../../store/data-process/selector';


function OfferImages(): JSX.Element {

  const selectedOfferImages = useAppSelector(getSelectedOfferData)?.images;
  const reducedSelectedOfferImages = selectedOfferImages?.slice(0, MAX_OFFER_IMAGE_QUANTITY);


  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {reducedSelectedOfferImages?.map((image) => (
          <div className="property__image-wrapper" key = {`${image}-${image}`}>
            <img className="property__image" src={image} alt="studio" />
          </div >))}
      </div>
    </div>
  );
}

export default memo(OfferImages);
