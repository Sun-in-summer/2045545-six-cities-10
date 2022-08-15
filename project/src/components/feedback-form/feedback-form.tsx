import {ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchReviewsAction, sendReviewAction } from '../../store/api-actions';
import FeedbackRating from '../feedback-rating/feedback-rating';
import {feedbackReview} from '../../types/reviews';
import { useParams } from 'react-router-dom';


function FeedbackForm(): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '0',
    review: '',
  });
  const dispatch = useAppDispatch();

  const {rating, review} = formData;
  const {id} = useParams();
  const hotelId = id;

  const onSubmit = (reviewData: feedbackReview) => {
    dispatch(sendReviewAction(reviewData));
    setFormData({...formData, review: '', rating: '0'});
    dispatch(fetchReviewsAction(id));
  };


  const fieldChangeHandle = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) : void => {
    const {target} = event;
    const {value, name} = target;
    setFormData({...formData, [name]: value });
  };


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if ( review !== '' && rating !== '0') {
      onSubmit({
        id: hotelId,
        rating: Number(rating),
        comment: review,
        date: new Date().toISOString(),
      });
    }
  };


  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit ={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <FeedbackRating onChange ={fieldChangeHandle} ratingValue ={rating}/>

      </div>


      <textarea
        onChange = {fieldChangeHandle}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value= {formData.review}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={false}>Submit</button>
      </div>
    </form>
  );
}

export default FeedbackForm;


