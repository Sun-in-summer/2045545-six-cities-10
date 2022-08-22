import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-actions';
import { getReviewsData } from '../../store/data-process/selector';
// import { Reviews } from '../../types/reviews';
import Feedback from '../feedback/feedback';

// type FeedbackListProps = {
//   reviews: Reviews,
// }


function FeedbacksList(): JSX.Element {

  const reviews = useAppSelector(getReviewsData);
  console.log(reviews);
  const {id} = useParams();
   console.log(id);
  const dispatch = useAppDispatch();

 //добавить флаг загрузки!!
  useEffect(() => {
    if (reviews.length=== 0 ) {
      console.log('dispatch');
      dispatch(fetchReviewsAction(id as string));
    }
  }, [dispatch, id, reviews]);


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
