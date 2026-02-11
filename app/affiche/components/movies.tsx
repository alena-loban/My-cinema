import { Movie as MovieType } from '@/app/types';
import { getMovies } from '../api/actions';
import Movie from './movie';
import styles from './styles.module.scss';

const Movies = async () => {
  const movies = (await getMovies()) || [];
  return (
    <div className={styles.movies}>
      {movies.map(movie => (
        <Movie key={movie.id} movie={movie as MovieType} /> //пересмотреть типы
      ))}
    </div>
  );
};
export default Movies;
