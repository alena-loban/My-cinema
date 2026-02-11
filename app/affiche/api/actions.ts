'use server';

import { prisma } from '@/shared/lib/prisma';

export const getMovies = async () => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        photos: true,
        genres: true,
        countries: true,
      },
    });
    return movies;
  } catch {}
};

export const getMovieById = async (id: number) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        photos: true,
        genres: true,
        countries: true,
      },
    });
    return movie;
  } catch (e) {
    console.log(e);
  }
};
