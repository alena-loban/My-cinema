import { KinopoiskMovie } from '@/app/types';
import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type MoviesState = {
  selectedIds: Set<number>;
  downloadedMoviesIds: Set<number>;
  previewMovies: KinopoiskMovie[];
  setPreviewMovies: (movies: KinopoiskMovie[]) => void;
  setDownloadedMoviesIds: (ids: Set<number>) => void;
  setSelectedIds: (ids: Set<number>) => void;
  toggleSelectedId: (id: number) => void;
  resetSelectedIds: () => void;
  resetDownloadedMoviesIds: () => void;
};

export const useMoviesStore = create<MoviesState>()(
  immer(set => ({
    selectedIds: new Set(),
    downloadedMoviesIds: new Set(),
    previewMovies: [],
    setPreviewMovies: movies => set(() => ({ previewMovies: movies })),
    setDownloadedMoviesIds: ids => set(() => ({ downloadedMoviesIds: ids })),
    setSelectedIds: ids => set(() => ({ selectedIds: ids })),
    toggleSelectedId: id =>
      set(({ selectedIds }) => {
        if (selectedIds.has(id)) {
          selectedIds.delete(id);
        } else {
          selectedIds.add(id);
        }
      }),
    resetSelectedIds: () =>
      set(({ selectedIds }) => {
        selectedIds.clear();
      }),
    resetDownloadedMoviesIds: () =>
      set(({ downloadedMoviesIds }) => {
        downloadedMoviesIds.clear();
      }),
  }))
);

enableMapSet();
