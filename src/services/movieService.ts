import axios from 'axios';
import { type MovieResponse } from '../types/movie';
export default async function fetchMovies(query: string) {
  return await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
}
