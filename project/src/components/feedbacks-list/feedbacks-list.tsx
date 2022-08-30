import { Fragment } from 'react';
import { useAppSelector } from '../../hooks';
import { getReviewsData } from '../../store/data-process/selector';
import Feedback from '../feedback/feedback';
import {sortReviews} from '../../utils/utils';

type FeedbackListProps ={
  id: string | undefined
}


function FeedbacksList({id}: FeedbackListProps): JSX.Element {

  const reviews = useAppSelector(getReviewsData);
  const sortedReviews = sortReviews(reviews);


  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => <Feedback review={review} key= {review.id}/>)}
      </ul>
    </Fragment>

  );
}

export default FeedbacksList;
