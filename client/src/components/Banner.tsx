import { Link } from 'wouter';
import { Movie } from '@shared/schema';
import { Skeleton } from './Skeleton';

interface BannerProps {
  movie: Movie | null;
  isLoading?: boolean;
}

const Banner = ({ movie, isLoading = false }: BannerProps) => {
  if (isLoading) {
    return (
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <Skeleton className="absolute inset-0" />
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const movieSlug = movie.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10"></div>
      
      <img 
        src={movie.backdropUrl || movie.posterUrl} 
        alt={movie.title} 
        className="object-cover w-full h-full"
      />
      
      <div className="absolute bottom-0 left-0 p-6 md:p-16 z-20 w-full md:w-2/3">
        <h1 className="text-white text-3xl md:text-5xl font-montserrat font-bold mb-3">{movie.title}</h1>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          {movie.genres && movie.genres.slice(0, 3).map((genre, index) => (
            <Link 
              key={index} 
              href={`/the-loai/${genre.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-white text-xs px-2 py-1 rounded ${index === 0 ? 'bg-primary' : 'bg-gray-800'}`}
            >
              {genre}
            </Link>
          ))}
          <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{movie.releaseYear}</span>
        </div>
        
        <p className="text-gray-300 mb-6 line-clamp-3">{movie.overview}</p>
        
        <div className="flex gap-3 flex-wrap">
          <Link 
            href={`/phim/${movieSlug}`} 
            className="bg-primary hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
          >
            <i className="fa-solid fa-play mr-2"></i> Xem phim
          </Link>
          
          {movie.trailerUrl && (
            <a 
              href={movie.trailerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
            >
              <i className="fa-solid fa-film mr-2"></i> Xem trailer
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
