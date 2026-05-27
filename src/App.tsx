import SearchBar from './SearchBar';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import fetchMovies from './services/movieService';
import { type Movie } from './types/movie';
import MovieGrid from './MovieGrid';
import MovieModal from './MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(query: string) {
    try {
      const response = await fetchMovies(query);
      setMovies(response.data.results);
    } catch {
      toast.error('Ошибка загрузки фильмов');
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

  // В JSX:
  <MovieGrid movie={movies} onSelect={handleSelect} />;
  {
    isModalOpen && selectedMovie && (
      <MovieModal onClose={closeModal} movie={selectedMovie} />
    );
  }

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      {movies.length > 0 && (
        <MovieGrid movie={movies} onSelect={handleSelect} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </>
  );
}
