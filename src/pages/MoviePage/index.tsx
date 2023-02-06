import { AxiosRequestConfig } from 'axios';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import { Movie } from '../../types/domain/Movie';
import { requestBackend } from '../../util/request';

export const loader = async({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/movies/${ id }`,
    withCredentials: true
  };
  const response = await requestBackend(config);
  const movie = response.data;
  return { movie }
}

type Loader = {
  movie: Movie;
}

const MoviePage = () => {

  const { movie } = useLoaderData() as Loader;

  return (
    <div className="container py-3" id="movie-page-container">
      <MovieDetailsCard movie={movie} />
    </div>
  );
}

export default MoviePage;
