import type { Movie } from '@/app/types';
import styles from './styles.module.scss';
import Image from 'next/image';
import { ButtonComponent } from '@/shared/ui';
import {
  ClockCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

type Props = {
  movie: Movie;
};
const MovieBanner = ({ movie }: Props) => {
  const { nameEn, nameRu, genres, ratingAgeLimits, year, filmLength } = movie;
  const name = nameRu ?? nameEn;
  const duration =
    `${Math.floor(filmLength / 60)} ч ${filmLength % 60} мин`
      .replace(/(^0ч | 0мин$)/g, '')
      .trim() || '0мин';
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Image
          src={movie?.posterUrl ?? ''}
          alt={`постер фильма ${movie?.nameRu}`}
          //   width={1300}
          //   height={700}
          className={styles.poster}
          fill={true}
        />
      </div>
      <div className={styles.infoBox}>
        <div className={styles.info}>
          <div className={styles.top}>
            <h1>{name}</h1>
            <div className={styles.genres}>
              {genres?.map(({ genre }, index) => (
                <span key={genre}>
                  {genre}
                  {index !== genres.length - 1 && ','}
                </span>
              ))}
            </div>
            <div className={styles.duration}>
              <ClockCircleOutlined />
              <span>{duration}</span>
            </div>

            <div className={styles.tags}>
              <span className={styles.tag}>{ratingAgeLimits}</span>
              <span className={styles.tag}>{year}</span>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.extraInfo}>
              <div className={styles.row}>
                <VideoCameraOutlined className={styles.icon} />
                <div>
                  <h2>В кино с 8 января</h2>
                  <p>по 11 февраля</p>
                </div>
              </div>
              <div className={styles.row}>
                <UserOutlined className={styles.icon} />
                <div>
                  <h2>{ratingAgeLimits}</h2>
                  <p>Возраст зрителей</p>
                </div>
              </div>
            </div>
            <ButtonComponent>Купить билет</ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieBanner;
