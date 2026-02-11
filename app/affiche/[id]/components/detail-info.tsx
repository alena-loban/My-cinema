import { Movie } from '@/app/types';
import styles from './styles.module.scss';
import Image from 'next/image';

type Props = {
  movie: Movie;
};
const DetailInfo = ({ movie }: Props) => {
  const { photos, description, genres, filmLength } = movie;
  const duration =
    `${Math.floor(filmLength / 60)} ч ${filmLength % 60} мин`
      .replace(/(^0ч | 0мин$)/g, '')
      .trim() || '0мин';
  return (
    <div className={styles.detailInfo}>
      <div className={styles.columnsInfo}>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <h3>Жанры:</h3>
            <div className={styles.genres}>
              {genres?.map(({ genre }, index) => (
                <span key={genre}>
                  {genre}
                  {index !== genres.length - 1 && ','}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.infoRow}>
            <h3>Длительность:</h3>
            <span>{duration}</span>
          </div>
        </div>
        <div className={styles.description}>
          <h3>Описание:</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.photos}>
        {photos.map(({ imageUrl, previewUrl }, index) => (
          <Image
            key={index}
            src={imageUrl ?? previewUrl ?? ''}
            alt={'постер фильма'}
            width={330}
            height={200}
            className={styles.img}
          />
        ))}
      </div>
    </div>
  );
};
export default DetailInfo;
