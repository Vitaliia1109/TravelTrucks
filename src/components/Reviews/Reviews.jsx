import css from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div className={css.reviews}>
      {reviews.map((review, index) => (
        <div key={index} className={css.review}>
          <div className={css.reviewer}>
            <span className={css.reviewerInitial}>
              {review.reviewer_name?.charAt(0).toUpperCase()}
            </span>
            <span className={css.reviewerName}>{review.reviewer_name}</span>
          </div>
          <div className={css.reviewContent}>
            <p>{review.comment}</p>
            <p className={css.rating}>Rating: {review.reviewer_rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
