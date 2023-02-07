import { AxiosRequestConfig } from 'axios'
import { useLoaderData, useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';
import { MovieList } from '../../types/domain/MovieList';
import { SpringPage } from '../../types/vendor/SpringPage';
import { requestBackend } from '../../util/request';
import './styles.css';

export const loader = async() => {
  console.log('No loader do Movies');
  const config: AxiosRequestConfig = {
    method: 'get',
    url: '/movies',
    withCredentials: true
  }
  const response = await requestBackend(config);
  const moviesData = response.data;
  return { moviesData };
}

type LoaderData = {
  moviesData: SpringPage<MovieList>;
}

const Movies = () => {

  const { moviesData } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  const content = moviesData.content.map((movie) => (
    <div className="col movie-card-container" key={movie.id} onClick={() => navigate(`${movie.id}`)}>
      <MovieCard movie={movie} />
    </div>
  ))

  return (
    <div className="container py-3">
      <div className="row mb-4">
        <h1>Movies</h1>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 g-lg-3">
        { content }
      </div>
    </div>
  );
}

export default Movies;
