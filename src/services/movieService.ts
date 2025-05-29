import axios from "axios";
import { type Movie } from "../types/movie";

const url = "https://api.themoviedb.org/3/search/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

interface MoviesFatchResult {
  results: Movie[];
  totalPages: number;
}
export async function fetchMovies(
  topic: string,
  page = 1
): Promise<MoviesFatchResult> {
  const response = await axios.get<MoviesHttpResponse>(
    `${url}?query=${topic}&page=${page}`,
    { headers: { Authorization: `Bearer ${myKey}` } }
  );
  console.log(response.data.results);

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}
