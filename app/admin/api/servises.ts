'use server';
import { prisma } from '@/lib/prisma';
import {
  Countries,
  DetailMovie,
  KinopoiskMovie,
  Photos,
  Genres,
} from '../../types';

type Params = {
  year: number;
  month: string;
};

type ResponseAllMovies = {
  total: number;
  items: KinopoiskMovie[];
};

type ResponseMoviePhotos = {
  total: number;
  totalPages: number;
  items: Photos[];
};

const KINOPOISK_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY_MOVIES ?? '';
const KINOPOISK_HEADERS = {
  'X-API-KEY': X_API_KEY,
  'Content-Type': 'application/json',
};

const baseFetch = async (url: string | URL | Request, params: RequestInit) => {
  const { cache } = params;
  const response = await fetch(url, {
    ...params,
    cache: cache ?? 'force-cache',
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

export const getMovies = async ({
  year = 2026,
  month = 'JANUARY',
}: Params): Promise<ResponseAllMovies> => {
  return await baseFetch(
    `${KINOPOISK_URL}/premieres?year=${year}&month=${month}`,
    { method: 'GET', headers: KINOPOISK_HEADERS, next: { tags: ['movies'] } }
  );
};

export const getMovieInfoById = async (id: number): Promise<DetailMovie> => {
  return await baseFetch(`${KINOPOISK_URL}/${id}`, {
    method: 'GET',
    headers: KINOPOISK_HEADERS,
    next: { tags: [`movie/${id}`] },
  });
};

export const getMoviePhotos = async (
  id: number
): Promise<ResponseMoviePhotos> => {
  return await baseFetch(`${KINOPOISK_URL}/${id}/images?type=STILL&page=1`, {
    method: 'GET',
    headers: KINOPOISK_HEADERS,
    next: { tags: [`movie-poster/${id}`] },
  });
};

type ExtraInfo = {
  photos: Photos[];
  countries: Countries[];
  genres: Genres[];
  movies: Omit<DetailMovie, 'countries' | 'genres'>[];
};

export const getExtraMoviesInfo = async (ids: number[]): Promise<ExtraInfo> => {
  const total = ids.length;
  let inPending = 0;
  let index = 0;
  let completed = 0;
  const limit = Math.min(5, total);

  const result: ExtraInfo = {
    photos: [],
    countries: [],
    genres: [],
    movies: [],
  };

  return new Promise(resolve => {
    function next() {
      while (inPending < limit && index < total) {
        const currentIndex = index;
        const currentId = ids[currentIndex];
        index++;
        inPending++;
        Promise.allSettled([
          getMovieInfoById(currentId),
          getMoviePhotos(currentId),
        ])
          .then(res => {
            const [info, posters] = res;
            if (info.status === 'fulfilled' && posters.status === 'fulfilled') {
              const { countries, genres, ...rest } = info.value;
              const mappedCountries = countries.map(country => ({
                ...country,
                movieId: currentId,
              }));
              const mappedGenres = genres.map(genre => ({
                ...genre,
                movieId: currentId,
              }));
              const mappedPosters = posters.value.items.map(poster => ({
                ...poster,
                movieId: currentId,
              }));
              result.countries.push(...mappedCountries);
              result.genres.push(...mappedGenres);
              result.movies.push(rest);
              result.photos.push(...mappedPosters);
            }
          })
          .finally(() => {
            inPending--;
            completed++;
            if (completed === total) {
              resolve(result);
            } else {
              next();
            }
          });
      }
    }

    next();
  });
};

export const loadMovies = async (ids: number[]) => {
  const { countries, genres, movies, photos } = await getExtraMoviesInfo(ids);
  try {
    // await prisma.$transaction([
    //   prisma.country.createMany({ data: countries }),
    //   prisma.genre.createMany({ data: genres }),
    //   prisma.movie.createMany({ data: movies }),
    //   prisma.photo.createMany({ data: photos }),
    // ]);
  } catch (e) {
    console.log(e);
  }
};
