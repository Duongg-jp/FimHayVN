import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Skeleton } from '../components/Skeleton';

const SearchResults = () => {
  const [location] = useLocation();
  const { searchMovies, isLoading } = useMovies();
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const query = new URLSearchParams(location.split('?')[1]).get('q') || '';
  
  useEffect(() => {
    async function fetchResults() {
      if (query) {
        setIsSearching(true);
        document.title = `Tìm kiếm: ${query} - FilmHay`;
        
        const searchResults = await searchMovies(query);
        setResults(searchResults);
        setIsSearching(false);
      }
    }
    
    fetchResults();
    window.scrollTo(0, 0);
  }, [query, searchMovies]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Kết quả tìm kiếm</h1>
      <p className="text-gray-400 mb-8">Hiển thị kết quả cho: "{query}"</p>
      
      {isLoading || isSearching ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/50 p-8 rounded-lg text-center">
          <i className="fa-solid fa-search text-4xl text-gray-500 mb-4"></i>
          <h2 className="text-xl font-bold text-white mb-2">Không tìm thấy kết quả</h2>
          <p className="text-gray-400">
            Rất tiếc, chúng tôi không thể tìm thấy phim phù hợp với từ khóa "{query}".
          </p>
          <p className="text-gray-400 mt-4">
            Hãy thử tìm kiếm với từ khóa khác hoặc duyệt phim theo thể loại.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
