import { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchReviewsAction } from '../../store/api-actions';
import Feedback from '../feedback/feedback';

type FeedbacksListProps = {
  offerId: string
}

function FeedbacksList({offerId}: FeedbacksListProps): JSX.Element {
  const id = offerId;

  store.dispatch(fetchReviewsAction(id));


  const {reviews} = useAppSelector((state) => state);

  console.log(reviews);


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
