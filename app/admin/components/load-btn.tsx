'use client';
import { ButtonComponent } from '@/shared/ui';
import { Tooltip } from 'antd';
import { loadMovies } from '../api/actions';
import { useMoviesStore } from '../store/movies';
import styles from './styles.module.scss';

const LoadBtn = () => {
  const selectedIds = useMoviesStore(state => state.selectedIds);
  const downloadedMoviesIds = useMoviesStore(
    state => state.downloadedMoviesIds
  );
  const setDownloadedMoviesIds = useMoviesStore(
    state => state.setDownloadedMoviesIds
  );

  const resetSelectedIds = useMoviesStore(state => state.resetSelectedIds);

  const handleLoad = async () => {
    const ids = await loadMovies([...selectedIds]);
    const newMoviesIds = new Set([...downloadedMoviesIds, ...ids]);
    setDownloadedMoviesIds(newMoviesIds);
    resetSelectedIds();
  };
  const tooltip = !!!selectedIds.size && 'нужно выбрать минимум один фильм';
  return (
    <div className={styles.footer}>
      <Tooltip title={tooltip}>
        <ButtonComponent disabled={!!!selectedIds.size} onClick={handleLoad}>
          загрузить в бд
        </ButtonComponent>
      </Tooltip>
    </div>
  );
};
export default LoadBtn;
