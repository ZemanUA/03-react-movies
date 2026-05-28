import css from './MovieGrid.module.css';
import { type Movie } from './types/movie';
interface MovieGridProps {
  movie: Movie[];
  onSelect: (movie: Movie) => void;
}
export default function MovieGrid({ movie, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movie.map(item => (
        <li key={item.id} onClick={() => onSelect(item)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              alt={item.title}
              loading="lazy"
            />
            <h2 className={css.title}>{item.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
