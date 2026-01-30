export type Genres = {
  genre: string;
  movieId?: number;
};
export type Countries = {
  country: string;
  movieId?: number;
};

export type Photos = {
  imageUrl: string;
  previewUrl: string;
  movieId?: number;
};

export type KinopoiskMovie = {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: Countries[];
  genres: Genres[];
};

export type DetailMovie = KinopoiskMovie & {
  kinopoiskHDId: string;
  imdbId: string;
  nameOriginal: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
  startYear: number;
  endYear: number;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
};

export type Movie = DetailMovie & {
  id: number;
  photos: Photos[];
};
