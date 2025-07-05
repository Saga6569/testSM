const API_TOKEN_KINOPOISK = '4ff407cd-7125-4ca1-abcd-0686523ed773';
const API_URL_KINOPOISK = 'https://kinopoiskapiunofficial.tech/api/v2.2';

export interface Movie {
  kinopoiskId: number;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: Array<{
    country: string;
  }>;
  genres: Array<{
    genre: string;
  }>;
  ratingKinopoisk: number;
  ratingImdb: number | null;
  year: number;
  type: string;
  posterUrl: string;
  posterUrlPreview: string;
  description: string | null;
}

export interface MoviesResponse {
  items: Movie[];
  total: number;
  totalPages: number;
  page: number;
}

export const fetchMovies = async (
  page: number,
  type: string,
): Promise<MoviesResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': `${API_TOKEN_KINOPOISK}`,
    },
  };

  const response = await fetch(
    `${API_URL_KINOPOISK}/films?order=RATING&type=${type ?? 'FILM'}&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Ошибка при загрузке фильмов');
  }

  const data = await response.json();

  return data;
};
