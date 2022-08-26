import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import { getReviewsData, getReviewsLoadingStatus } from '../../store/data-process/selector';
import Feedback from '../feedback/feedback';
import {sortReviews} from '../../utils/utils';


function FeedbacksList(): JSX.Element {

  const reviews = useAppSelector(getReviewsData);
  const isReviewsLoaded = useAppSelector(getReviewsLoadingStatus);
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const sortedReviews = sortReviews(reviews);


  useEffect(() => {
    if ((reviews.length === 0 || reviews[0].id ) && !isReviewsLoaded) {
      dispatch(fetchReviewsAction(id as string));
    }
  }, [dispatch, id, isReviewsLoaded, reviews, reviews.length]);


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
