import { MovieList } from "../../types/domain/MovieList";

type Props = {
  movie: MovieList;
}

const MovieCard = ({ movie }: Props) => {

  return (
    <div className="card base-card">
      <img src={ movie.imgUrl } className="card-img-top" alt="Movie " />
      <div className="card-body">
        <h4 className="card-title">{ movie.title }</h4>
        { movie.subTitle && <h6 className="card-subtitle mb-2">{ movie.subTitle }</h6> }
        <p className="card-text">Ano: { movie.year }</p>
      </div>
    </div>
  );
}

export default MovieCard;
