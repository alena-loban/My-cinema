'use server';
import { prisma } from '@/shared/lib/prisma';
import { getExtraMoviesInfo } from './services';

export const loadMovies = async (ids: number[]) => {
  const movies = await getExtraMoviesInfo(ids);
  try {
    for (const movie of movies) {
      await prisma.movie.create({
        data: {
          ...movie,
          countries: {
            create: movie.countries,
          },
          genres: {
            create: movie.genres,
          },
          photos: {
            create: movie.photos,
          },
        },
        include: {
          countries: true,
          genres: true,
          photos: true,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
  return ids;
};

export const getAllMovies = async () => {
  try {
    const movies = await prisma.movie.findMany();
    return movies;
  } catch {}
};

export const getAllMoviesIds = async (idSelector: 'id' | 'kinopoiskId') => {
  const ids = new Set<number>();
  try {
    const movies = (await getAllMovies()) || [];
    movies.forEach(movie => {
      ids.add(movie[idSelector]!);
    });
  } catch {}
  return ids;
};
