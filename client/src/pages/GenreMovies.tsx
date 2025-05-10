import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Skeleton } from '../components/Skeleton';
import { getUrlFromSlug } from '@/lib/utils';

const GenreMovies = () => {
  const [, params] = useRoute('/the-loai/:genre');
  const { getMoviesByGenre, isLoading } = useMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;
  
  const genreSlug = params?.genre || '';
  const genreName = getUrlFromSlug(genreSlug);
  
  // Get movies by genre
  const genreMovies = getMoviesByGenre(genreSlug);
  
  // Calculate pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = genreMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(genreMovies.length / moviesPerPage);
  
  useEffect(() => {
    document.title = `Phim ${genreName.charAt(0).toUpperCase() + genreName.slice(1)} - FilmHay`;
    window.scrollTo(0, 0);
  }, [genreName, currentPage]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Phim {genreName.charAt(0).toUpperCase() + genreName.slice(1)}
      </h1>
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : genreMovies.length > 0 ? (
        <>
          {/* Movie grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-chevron-left mr-1"></i> Trước
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = currentPage > 3 ? currentPage - 3 + i + 1 : i + 1;
                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === pageNum 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="self-center px-1">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau <i className="fa-solid fa-chevron-right ml-1"></i>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-800/50 p-8 rounded-lg text-center">
          <i className="fa-solid fa-film-slash text-4xl text-gray-500 mb-4"></i>
          <h2 className="text-xl font-bold text-white mb-2">Không có phim nào</h2>
          <p className="text-gray-400">
            Rất tiếc, chúng tôi không tìm thấy phim thuộc thể loại {genreName} nào.
          </p>
        </div>
      )}
    </div>
  );
};

export default GenreMovies;
