import { Review } from "../../types/domain/Review"
import './styles.css';

type Props = {
  review: Review;
}

const ReviewComponent = ({ review }: Props) => {
  return (
    <div className="py-2 review-compoenent-container">
      <h5><i className="bi bi-star-fill mx-3 primary-color"></i>{ review.user.name }</h5>
      <div className="px-3 py-2 third-color review-box">
        { review.text }
      </div>
    </div>
  );
}

export default ReviewComponent;
