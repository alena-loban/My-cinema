'use client';
import { KinopoiskMovie } from '@/app/types';
import { Checkbox } from 'antd';
import { useState } from 'react';
import Image from 'next/image';
import { loadMovies } from '../api/servises';

type Props = {
  movies: KinopoiskMovie[];
};
export default function PreviewMovie({ movies }: Props) {
  const [selectedIds, setSelectedIds] = useState<number[] | []>([]);

  const handleChange = (checked: boolean, id: number) => {
    console.log(selectedIds);
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      const filteredIds = selectedIds.filter(el => el !== id);
      setSelectedIds(filteredIds);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <ul style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {movies?.map(movie => (
          <Checkbox
            key={movie.kinopoiskId}
            onChange={event =>
              handleChange(event.target.checked, movie.kinopoiskId)
            }
          >
            <li style={{ display: 'flex', gap: '7px' }}>
              <Image
                src={movie?.posterUrl}
                alt="poster preview movie"
                width={80}
                height={90}
                style={{ objectFit: 'cover' }}
              />
              <span>{movie.nameRu}</span>
            </li>
          </Checkbox>
        ))}
      </ul>
      <button onClick={() => loadMovies(selectedIds)}>Загрузить в бд</button>
    </div>
  );
}
