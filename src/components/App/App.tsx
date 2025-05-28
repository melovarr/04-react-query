import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import toast from "react-hot-toast";
import ToasterMessage from "../Toaster/Toaster";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [loading, setLoading] = useState(false);

  const [hasError, setHasError] = useState(false);

  const handleSearch = async (topic: string): Promise<void> => {
    setLoading(true);
    setHasError(false);
    setMovies([]);
    try {
      const data = await fetchMovies(topic);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setMovies(data);
      }
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };
  function selectMovie(movie: Movie): void {
    setSelectedMovie(movie);
  }
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {hasError && <ErrorMessage />}
      <MovieGrid onSelect={selectMovie} movies={movies} />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <ToasterMessage />
    </>
  );
}
