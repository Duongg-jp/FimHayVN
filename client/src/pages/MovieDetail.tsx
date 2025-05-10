import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useMovies } from '../context/MovieContext';
import { Skeleton } from '../components/Skeleton';
import CategoryList from '../components/CategoryList';
import { getRandomSubset } from '@/lib/utils';

const MovieDetail = () => {
  const [, params] = useRoute('/phim/:slug');
  const { getMovieBySlug, movies, isLoading } = useMovies();
  const [relatedMovies, setRelatedMovies] = useState([]);
  
  const movie = params ? getMovieBySlug(params.slug) : undefined;
  
  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} - FilmHay`;
      
      // Get related movies based on genre
      if (movie.genres && movie.genres.length > 0) {
        const similarMovies = movies.filter(m => 
          m.id !== movie.id && 
          m.genres && 
          m.genres.some(genre => movie.genres?.includes(genre))
        );
        setRelatedMovies(getRandomSubset(similarMovies, 6));
      }
    }
    
    window.scrollTo(0, 0);
  }, [movie, movies]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/3 aspect-[2/3] rounded-lg" />
          <div className="w-full md:w-2/3 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/50 p-8 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Phim không tồn tại</h1>
          <p className="text-gray-400 mb-6">Rất tiếc, chúng tôi không thể tìm thấy phim bạn yêu cầu.</p>
          <Link 
            href="/" 
            className="bg-primary hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-full transition-colors inline-flex items-center"
          >
            <i className="fa-solid fa-home mr-2"></i> Về trang chủ
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="relative">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#121212] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] to-transparent z-10"></div>
          {movie.backdropUrl && (
            <img 
              src={movie.backdropUrl} 
              alt={movie.title} 
              className="object-cover w-full h-full opacity-40"
            />
          )}
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-8 relative z-20">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie poster */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>
            
            {/* Movie details */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
              
              {movie.originalTitle && (
                <h2 className="text-xl text-gray-400 mb-4">{movie.originalTitle}</h2>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres && movie.genres.map((genre, index) => (
                  <Link 
                    key={index} 
                    href={`/the-loai/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-primary/20 hover:bg-primary/40 text-white text-sm px-3 py-1 rounded-full transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-6 mb-6 text-gray-300">
                <div className="flex items-center">
                  <i className="fa-solid fa-calendar-days mr-2 text-primary"></i>
                  <span>{movie.releaseYear}</span>
                </div>
                
                {movie.rating && (
                  <div className="flex items-center">
                    <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
                    <span>{(movie.rating / 10).toFixed(1)}/10</span>
                  </div>
                )}
                
                {movie.duration && (
                  <div className="flex items-center">
                    <i className="fa-solid fa-clock mr-2 text-primary"></i>
                    <span>{movie.duration} phút</span>
                  </div>
                )}
                
                {movie.type === 'series' && (
                  <div className="flex items-center">
                    <i className="fa-solid fa-film mr-2 text-primary"></i>
                    <span>{movie.episodeCount} tập</span>
                  </div>
                )}
                
                {movie.countries && movie.countries.length > 0 && (
                  <div className="flex items-center">
                    <i className="fa-solid fa-globe mr-2 text-primary"></i>
                    <span>{movie.countries.join(', ')}</span>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Nội dung phim</h3>
                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="bg-primary hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-full transition-colors flex items-center">
                  <i className="fa-solid fa-play mr-2"></i> Xem phim
                </button>
                
                {movie.trailerUrl && (
                  <a 
                    href={movie.trailerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-full transition-colors flex items-center"
                  >
                    <i className="fa-solid fa-film mr-2"></i> Xem trailer
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Episodes section for series */}
      {movie.type === 'series' && movie.episodeCount && movie.episodeCount > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-4">Danh sách tập phim</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: movie.episodeCount }, (_, i) => (
              <button 
                key={i}
                className={`py-2 px-4 rounded-md text-center transition-colors ${
                  (movie.currentEpisode && i + 1 <= movie.currentEpisode)
                    ? 'bg-primary hover:bg-pink-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                Tập {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Related movies */}
      {relatedMovies.length > 0 && (
        <CategoryList 
          title="Phim liên quan" 
          movies={relatedMovies} 
          viewAllLink={`/the-loai/${movie.genres ? movie.genres[0].toLowerCase().replace(/\s+/g, '-') : ''}`}
        />
      )}
    </>
  );
};

export default MovieDetail;
