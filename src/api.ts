const API_KEY = "e9b0adaaa434459d591092991cf0cbc5";

const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface ITv {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export interface IGetMoviesResult {
  // dates: {
  //   maximum: string;
  //   minimum: string;
  // };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvDetail {
  backdrop_path?: string;
  genres?: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  overview?: string;
  first_air_date: string;
  episode_runtime?: number;
  name: string;
  vote_average: number;
  vote_count: number;
}

export function getNowPlayingMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export async function getOnTheAirTv() {
  const tvResult: IGetTvResult = await fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
  const movieResult: IGetMoviesResult = {
    page: tvResult.page,
    total_pages: tvResult.total_pages,
    total_results: tvResult.total_results,
    results: tvResult.results.map(convertTvToMovie),
  };
  return movieResult;
}

function convertTvToMovie(tv: ITv) {
  return {
    id: tv.id,
    backdrop_path: tv.backdrop_path,
    poster_path: tv.poster_path,
    title: tv.name,
    overview: tv.overview,
  };
}
