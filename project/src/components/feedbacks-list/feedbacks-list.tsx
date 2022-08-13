import { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import Feedback from '../feedback/feedback';

type FeedbacksListProps = {
  offerId: string
}

function FeedbacksList({offerId}: FeedbacksListProps): JSX.Element {


  const {reviews} = useAppSelector((state) => state);


  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Feedback review={review} key= {review.id}/>)}
      </ul>
    </Fragment>

  );
}

export default FeedbacksList;
