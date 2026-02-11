import type { Movie } from '@/app/types';
import Image from 'next/image';
import styles from './styles.module.scss';
import { ButtonComponent } from '@/shared/ui';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';

type Props = {
  movie: Movie;
};
const Movie = ({ movie }: Props) => {
  const {
    posterUrl,
    nameEn,
    nameRu,
    filmLength,
    ratingAgeLimits,
    year,
    genres,
    id,
  } = movie;
  const name = nameRu ?? nameEn;
  const duration =
    `${Math.floor(filmLength / 60)} ч ${filmLength % 60} мин`
      .replace(/(^0ч | 0мин$)/g, '')
      .trim() || '0мин';

  return (
    <Link href={`/affiche/${id}`}>
      <div className={styles.movie}>
        <Image
          src={posterUrl}
          alt={`постер фильма ${name}`}
          width={330}
          height={470}
          className={styles.poster}
        />
        <div className={styles.info}>
          <div className={styles.top}>
            <span className={styles.tag}>{ratingAgeLimits}</span>
            <span className={styles.tag}>{year}</span>
          </div>
          <div className={styles.bottom}>
            <h3>{name}</h3>
            <div className={styles.genres}>
              {genres?.map(({ genre }, index) => (
                <span key={genre}>
                  {genre}
                  {index !== genres.length - 1 && ','}
                </span>
              ))}
            </div>
            <p>{duration}</p>
          </div>
        </div>
        <div className={styles.hover}>
          <h3>{name}</h3>
          <div className={styles.btns}>
            <ButtonComponent>Купить билет</ButtonComponent>
            <ButtonComponent className={styles.more}>
              <span>Подробнее</span>
              <ArrowRightOutlined />
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Movie;
