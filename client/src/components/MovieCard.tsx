import { Link } from 'wouter';
import { Movie } from '@shared/schema';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const movieSlug = movie.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  return (
    <div className="movie-card min-w-[180px] md:min-w-[200px] group">
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="movie-card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <div className="mb-2 flex items-center justify-between">
            {movie.rating && (
              <span className="bg-primary/80 text-white text-xs px-2 py-0.5 rounded">
                {(movie.rating / 10).toFixed(1)} ⭐
              </span>
            )}
            <span className="bg-gray-800/80 text-white text-xs px-2 py-0.5 rounded">
              {movie.type === 'series' 
                ? `${movie.episodeCount || 0} tập` 
                : `${movie.duration || 0} phút`}
            </span>
          </div>
          <Link 
            href={`/phim/${movieSlug}`} 
            className="bg-primary hover:bg-pink-700 text-white text-center text-sm py-1.5 rounded-md transition-colors w-full"
          >
            Xem phim
          </Link>
        </div>
        
        {movie.type === 'series' && movie.currentEpisode && movie.episodeCount && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded">
            Tập {movie.currentEpisode}/{movie.episodeCount}
          </div>
        )}
      </div>
      <h3 className="mt-2 font-medium text-white text-base line-clamp-1">{movie.title}</h3>
      <p className="text-gray-400 text-sm">{movie.releaseYear}</p>
    </div>
  );
};

export default MovieCard;
