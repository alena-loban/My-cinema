'use client';
import { useMoviesStore } from '../store/movies';
import { useMemo, useState } from 'react';
import PreviewMovie from './preview-movie';
import { CheckboxComponent, ButtonComponent, SearchInput } from '@/shared/ui';
import styles from './styles.module.scss';
import Footer from './load-btn';

type Filters = 'all' | 'downloaded' | 'new';

const filtersValue: Array<{ label: string; value: Filters }> = [
  { label: 'новые', value: 'new' },
  { label: 'уже добавленные', value: 'downloaded' },
  { label: 'все', value: 'all' },
];

function PreviewMovies() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filters>('new');
  const [isSelectAll, setIsSelectAll] = useState(true);

  const downloadedMoviesIds = useMoviesStore(
    state => state.downloadedMoviesIds
  );
  const movies = useMoviesStore(state => state.previewMovies);
  const setSelectedIds = useMoviesStore(state => state.setSelectedIds);

  const handleClick = () => {
    if (isSelectAll) {
      const ids = new Set<number>();
      movies.forEach(({ kinopoiskId }) => {
        if (!downloadedMoviesIds.has(kinopoiskId)) {
          ids.add(kinopoiskId);
        }
      });
      setSelectedIds(ids);
    } else {
      setSelectedIds(new Set());
    }
    setIsSelectAll(prev => !prev);
  };

  const filteredValue = useMemo(() => {
    let result = movies;
    switch (filter) {
      case 'downloaded':
        result = movies.filter(({ kinopoiskId }) =>
          downloadedMoviesIds.has(kinopoiskId)
        );
        break;
      case 'new':
        result = movies.filter(
          ({ kinopoiskId }) => !downloadedMoviesIds.has(kinopoiskId)
        );
        break;
    }
    if (!search.trim()) {
      return result;
    }
    const searchLower = search.toLowerCase();

    return result.filter(({ nameRu, nameEn }) => {
      const ru = nameRu?.toLowerCase() || '';
      const en = nameEn?.toLowerCase() || '';
      return ru.includes(searchLower) || en.includes(searchLower);
    });
  }, [search, filter, movies, downloadedMoviesIds]);

  return (
    <div className={styles.previewMovies}>
      <div className={styles.filterPanel}>
        <SearchInput
          placeholder="введите название фильма"
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className={styles.btnBox}>
          {filtersValue.map(({ value, label }) => (
            <ButtonComponent
              type="text"
              key={value}
              onClick={() => setFilter(value)}
            >
              {label}
            </ButtonComponent>
          ))}
        </div>
        <div className={styles.checkbox}>
          <CheckboxComponent
            disabled={!!!filteredValue.length}
            onClick={handleClick}
          />
          <span> {isSelectAll ? 'выбрать все' : 'отменить выбор'}</span>
        </div>
        <Footer />
      </div>
      <ul className={styles.movies}>
        {filteredValue?.map(movie => (
          <PreviewMovie movie={movie} key={movie.kinopoiskId} />
        ))}
      </ul>
    </div>
  );
}

export default PreviewMovies;
