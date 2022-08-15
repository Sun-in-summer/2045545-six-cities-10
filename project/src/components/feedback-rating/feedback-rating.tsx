import { ChangeEvent, Fragment } from 'react';
import { RatingTitles } from '../../const';

type FeedbackRatingProps= {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  ratingValue: string,
}


function FeedbackRating({onChange, ratingValue}: FeedbackRatingProps): JSX.Element {

  const rating = Object.keys(RatingTitles).reverse();
  return (
    <Fragment>
      {rating.map((item) => {
        const isChecked = ratingValue === item;
        return (
          <Fragment key = {item}>
            <input
              onChange = {onChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={item}
              checked = {isChecked}
              id= {`${item} - stars`}
              type="radio"
            />
            <label
              htmlFor={`${item} - stars`}
              className="reviews__rating-label form__rating-label"
              title={'RatingTitle[item]'}
            >
              <svg
                className="form__star-image"
                width="37"
                height="33"
              >
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>);
      })}
    </Fragment>
  );
}

export default FeedbackRating;


