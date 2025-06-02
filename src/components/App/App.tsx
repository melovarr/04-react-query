import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";
import ToasterMessage from "../Toaster/Toaster";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";
import ReactPaginate from "react-paginate";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const selectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isPending && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={data.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={css.pagination}
          activeClassName={css.active}
          forcePage={currentPage - 1}
        />
      )}
      <MovieGrid onSelect={selectMovie} movies={data?.results || []} />
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

// export default function App() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [hasError, setHasError] = useState(false);

//   const handleSearch = async (topic: string, page: number): Promise<void> => {
//     setLoading(true);
//     setHasError(false);
//     setMovies([]);
//     try {
//       const { results, totalPages } = await fetchMovies(topic, page);
//       if (results.length === 0) {
//         toast.error("No movies found for your request.");
//       } else {
//         setMovies(results);
//         setTotalPages(totalPages);
//       }
//     } catch {
//       setHasError(true);
//     } finally {
//       setLoading(false);
//     }
//   };
//   function selectMovie(movie: Movie): void {
//     setSelectedMovie(movie);
//   }
//   return (
//     <>
//       <SearchBar onSubmit={handleSearch} />
//       {loading && <Loader />}
//       {hasError && <ErrorMessage />}
//       <MovieGrid onSelect={selectMovie} movies={movies} />
//       {selectedMovie && (
//         <MovieModal
//           movie={selectedMovie}
//           onClose={() => setSelectedMovie(null)}
//         />
//       )}
//       <ToasterMessage />
//     </>
//   );
// }
