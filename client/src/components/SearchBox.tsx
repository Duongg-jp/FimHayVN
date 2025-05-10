import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMovies } from '../context/MovieContext';
import { Movie } from '@shared/schema';

interface SearchBoxProps {
  isMobile?: boolean;
  onSearch?: () => void;
}

const SearchBox = ({ isMobile = false, onSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { searchMovies } = useMovies();
  const [, setLocation] = useLocation();
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        const searchResults = await searchMovies(query);
        setResults(searchResults);
        setShowResults(true);
        setIsSearching(false);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchMovies]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
      if (onSearch) onSearch();
    }
  };

  const handleResultClick = (slug: string) => {
    setShowResults(false);
    setLocation(`/phim/${slug}`);
    if (onSearch) onSearch();
  };

  const formatMovieSlug = (title: string) => {
    return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  };

  return (
    <div ref={searchBoxRef} className="relative w-full">
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Tìm kiếm phim..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="bg-[#1e1e1e] text-gray-200 py-2 px-4 pr-10 rounded-full w-full border border-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
        >
          <i className="fa-solid fa-search"></i>
        </button>
      </form>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto custom-dropdown">
          {isSearching ? (
            <div className="p-4 text-center text-gray-400">
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Đang tìm kiếm...
            </div>
          ) : results.length > 0 ? (
            <div>
              {results.slice(0, 5).map((movie, index) => (
                <div 
                  key={index}
                  onClick={() => handleResultClick(formatMovieSlug(movie.title))}
                  className="flex items-center gap-3 p-3 hover:bg-primary/20 cursor-pointer transition-colors"
                >
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-white font-medium">{movie.title}</h3>
                    <p className="text-xs text-gray-400">{movie.releaseYear} • {movie.type === 'series' ? 'Phim bộ' : 'Phim lẻ'}</p>
                  </div>
                </div>
              ))}
              {results.length > 5 && (
                <div 
                  className="p-3 text-center text-primary hover:text-pink-400 cursor-pointer"
                  onClick={() => {
                    setLocation(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
                    setShowResults(false);
                    if (onSearch) onSearch();
                  }}
                >
                  Xem tất cả {results.length} kết quả
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              Không tìm thấy kết quả phù hợp
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
