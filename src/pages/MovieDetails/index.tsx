import { ReactComponent as Star } from 'assets/images/star.svg';
import axios, { AxiosRequestConfig } from 'axios';
import FormReview from 'components/FormReview';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movies';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import { BASE_URL } from 'util/requests';
import { getAuthData } from 'util/storage';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const Details = () => {
  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + '/movies/' + movieId,
      headers: {
        Authorization: `Bearer ${getAuthData().access_token}`,
      },
    };

    axios(params).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + '/movies/' + movieId + '/reviews',
      headers: {
        Authorization: `Bearer ${getAuthData().access_token}`,
      },
    };

    axios(params).then((resp) => {
      setReviews(resp.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="details-container">
      <div className="movie-header-container">
        <div className="movie-picture">
          <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="movie-title">
          <h4>{movie?.title}</h4>
        </div>
        <div className="movie-synopsis">
          <p>{movie?.synopsis}</p>
        </div>
      </div>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <FormReview movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      {reviews.length !== 0 ? (
        <div className="base-card comment-container">
          {reviews?.map((review) => (
            <div className="detail-comment" key={review.id}>
              <span>
                <Star />
              </span>
              <span>{review?.user?.name}</span>
              <p>{review?.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Este filme ainda não possui avaliações!</div>
      )}
    </div>
  );
};

export default Details;
