'use client';

import { useState } from 'react';
import { KinopoiskMovie } from '@/app/types';
import PreviewMovie from './priview-movies';
import { getMovies } from '../api/servises';

export default function LoadMovies() {
  const [movies, setMovies] = useState<KinopoiskMovie[] | []>([]);
  const handleGetMovies = async () => {
    const newMovies = (await getMovies({ month: 'JANUARY', year: 2026 }))
      ?.items;
    setMovies(newMovies);
  };
  return (
    <div>
      <button onClick={handleGetMovies}>получить фильмы</button>;
      <hr />
      <PreviewMovie movies={movies} />
    </div>
  );
}
