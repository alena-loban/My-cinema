'use client';
import { KinopoiskMovie } from '@/app/types';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useMoviesStore } from '../store/movies';
import { CheckboxComponent } from '@/shared/ui';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  movie: KinopoiskMovie;
};

function PreviewMovie({ movie }: Props) {
  const { genres, kinopoiskId, nameEn, nameRu, posterUrl } = movie;
  const selectedIds = useMoviesStore(state => state.selectedIds);
  const toggleId = useMoviesStore(state => state.toggleSelectedId);
  const downloadedMoviesIds = useMoviesStore(
    state => state.downloadedMoviesIds
  );

  const isHasMovie = downloadedMoviesIds.has(kinopoiskId);
  const isSelected = selectedIds.has(kinopoiskId);
  const name = nameRu ?? nameEn;

  return (
    <li
      className={classNames(styles.movie, {
        [styles.opacity]: isHasMovie,
        [styles.selected]: isSelected,
      })}
    >
      <Tooltip
        key={kinopoiskId}
        title={isHasMovie && 'фильм уже был добавлен в бд'}
      >
        <CheckboxComponent
          checked={selectedIds.has(kinopoiskId)}
          disabled={isHasMovie}
          onChange={() => toggleId(kinopoiskId)}
        />
      </Tooltip>
      <Image
        src={posterUrl}
        alt={`постер фильма ${name}`}
        width={250}
        height={200}
        className={styles.poster}
      />

      <div className={styles.info}>
        <h3>{name}</h3>
        <div className={styles.genresWrapper}>
          {genres.map(({ genre }, index) => (
            <span key={genre}>
              {genre}
              {index !== genres.length - 1 && ','}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export default PreviewMovie;
