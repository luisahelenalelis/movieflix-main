import './styles.css';

import { Movie } from 'types/movies';

type Props = {
  movies: Movie | undefined;
};

const MovieCardDetails = ({ movies }: Props) => {
  return (
    <div className="base-card detail-product-card">
      <div className="card-top-detail-container">
        <img src={movies?.imgUrl} alt={movies?.title} />
      </div>
      <div className="card-botton-detail-container">
        <h6>{movies?.title}</h6>
        <p id="ano">{movies?.year}</p>
        <p>{movies?.subTitle}</p>
        <p id="synopsis">{movies?.synopsis}</p>
      </div>
    </div>
  );
};

export default MovieCardDetails;