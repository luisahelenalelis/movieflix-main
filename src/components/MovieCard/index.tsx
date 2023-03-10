import './styles.css';

import { Movie } from 'types/movies';

type Props = {
  movies: Movie | undefined;
};

const MovieCard = ({ movies }: Props) => {
  return (
    <div className="base-card product-card">
      <div className="card-top-container">
        <img src={movies?.imgUrl} alt={movies?.title} />
      </div>
      <div className="card-botton-container">
        <h6>{movies?.title}</h6>
        <p id="ano">{movies?.year}</p>
        <p>{movies?.subTitle}</p>
      </div>
    </div>
  );
};

export default MovieCard;
