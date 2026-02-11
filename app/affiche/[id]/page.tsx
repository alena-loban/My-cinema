import { Metadata } from 'next';
import { getMovieById } from '../api/actions';
import DetailInfo from './components/detail-info';
import MovieBanner from './components/movie-banner';
import styles from './styles.module.scss';

type Props = {
  params: {
    id: number;
  };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `movie-${id}`,
  };
}

export default async function Movie({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = Number((await params).id);

  const movie = await getMovieById(id);

  if (!movie) {
    return <div>Фильм не найден</div>;
  }

  return (
    <div className={styles.page}>
      <MovieBanner movie={movie} />
      <div className={styles.hr} />
      <DetailInfo movie={movie} />
      <div className={styles.hr} />
    </div>
  );
}
