import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import { type Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleSearch(query: string) {
    try {
      setHasSearched(false);
      setIsLoading(true);
      setIsError(false);
      const response = await fetchMovies(query);
      setMovies(response);
      setHasSearched(true);
    } catch {
      toast.error('Error loading your movies');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  function handleSelect(movie: Movie) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  <MovieGrid movies={movies} onSelect={handleSelect} />;
  {
    isModalOpen && selectedMovie && (
      <MovieModal onClose={closeModal} movie={selectedMovie} />
    );
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {hasSearched &&
        (movies.length > 0 ? (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        ) : (
          toast.error('No movies found for your request.')
        ))}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </>
  );
}
