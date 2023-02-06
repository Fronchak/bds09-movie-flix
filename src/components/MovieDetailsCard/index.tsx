import { Movie } from "../../types/domain/Movie"
import './styles.css';

type Props = {
  movie: Movie;
}

const MovieDetailsCard = ({ movie }: Props) => {

  return (
    <div className="row m-0 base-card" id="movie-details-card">
      <div className="col-12 col-md-6 p-0">
        <img className="img-fluid w-100" src={ movie.imgUrl } />
      </div>
      <div className="col-12 col-md-6 p-3">
        <h1>{movie.title}</h1>
        { movie.subTitle && <h2>{ movie.subTitle }</h2> }
        <p>Ano: { movie.year }</p>
        <span>Gênero: </span>
        <div className="alert alert-dark py-1 d-inline" role="alert">
          { movie.genre.name }
        </div>
      </div>
      <div className="col-12 px-0 mt-md-4" id="synopsis-container">
        <div className="p-3">
          <h4 className="mb-4">Sinopse:</h4>
          <p>{ movie.synopsis }</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsCard;
