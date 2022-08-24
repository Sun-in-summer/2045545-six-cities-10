import {Review} from '../../types/reviews';
import {ratingPercentage} from '../../utils/utils';
import dayjs from 'dayjs';


type FeedbackProps = {
  review: Review;
};

function Feedback({review}: FeedbackProps): JSX.Element {

  const {
    rating,
    comment,
    date,
    user
  } = review;

  const huminizedDate = dayjs(date).format('MMM DD');


  const {
    avatarUrl,
    name} = user;


  const starWidth: number = ratingPercentage(rating);


  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: starWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{huminizedDate}</time>
      </div>
    </li>
  );
}

export default Feedback;
