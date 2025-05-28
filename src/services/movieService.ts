import axios from "axios";
import { type Movie } from "../types/movie";

const url = "https://api.themoviedb.org/3/search/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
}
export async function fetchMovies(topic: string): Promise<Movie[]> {
  const response = await axios.get<MoviesHttpResponse>(
    `${url}?query=${topic}`,
    { headers: { Authorization: `Bearer ${myKey}` } }
  );
  console.log(response.data.results);

  return response.data.results;
}
