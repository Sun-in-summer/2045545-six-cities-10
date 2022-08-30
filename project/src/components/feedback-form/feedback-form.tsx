import {ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';
import FeedbackRating from '../feedback-rating/feedback-rating';
import {FeedbackReview} from '../../types/reviews';
import {MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from '../../const';
import { getReviewSendingStatus } from '../../store/data-process/selector';

type FeedbackFormProps ={
  id: string | undefined,
}


function FeedbackForm({id} : FeedbackFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    rating: null,
    review: '',
  });
  const dispatch = useAppDispatch();
  const isReviewSent = useAppSelector(getReviewSendingStatus);

  useEffect(() => {
    if (isReviewSent) {
      setFormData({
        review: '',
        rating: null,
      });
    }
  }, [isReviewSent]);


  const {rating, review} = formData;

  const hotelId = id;


  const onSubmit = useCallback((reviewData: FeedbackReview) => {
    dispatch(sendReviewAction(reviewData));
    // setFormData({...formData, review: '', rating: null});
  },[dispatch]);


  const fieldChangeHandle = useCallback((event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) : void => {
    const {target} = event;
    const {value, name} = target;
    setFormData({...formData, [name]: value });
  }, [formData]);


  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if ( review !== '' && rating !== null) {
      onSubmit({
        id: hotelId,
        rating: Number(rating),
        comment: review,
        date: new Date().toISOString(),
      });
      setFormData({review: '', rating: null});
    }
  },[hotelId, onSubmit, rating, review]);


  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit ={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <FeedbackRating
          onChange ={fieldChangeHandle}
          ratingValue ={rating}
        />
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
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.review.length < MIN_COMMENT_LENGTH || formData.review.length > MAX_COMMENT_LENGTH || formData.rating === null}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

export default memo(FeedbackForm);


