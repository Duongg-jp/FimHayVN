import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@shared/schema';

interface MovieContextType {
  movies: Movie[];
  featuredMovie: Movie | null;
  recommendedMovies: Movie[];
  tvSeries: Movie[];
  recentMovies: Movie[];
  isLoading: boolean;
  error: Error | null;
  searchMovies: (query: string) => Promise<Movie[]>;
  getMovieBySlug: (slug: string) => Movie | undefined;
  getMoviesByGenre: (genre: string) => Movie[];
  getMoviesByCountry: (country: string) => Movie[];
  getMoviesByYear: (year: number) => Movie[];
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  const { data: movies = [], isLoading, error } = useQuery<Movie[]>({
    queryKey: ['/api/movies'],
  });

  useEffect(() => {
    if (movies.length > 0 && !featuredMovie) {
      setFeaturedMovie(movies[0]);
    }
  }, [movies, featuredMovie]);

  const recommendedMovies = movies.filter(movie => movie.rating && movie.rating > 8).slice(0, 6);
  
  const tvSeries = movies
    .filter(movie => movie.type === 'series')
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 6);
  
  const recentMovies = movies
    .filter(movie => movie.type === 'movie')
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 6);

  const searchMovies = async (query: string): Promise<Movie[]> => {
    if (!query) return [];
    const lowercaseQuery = query.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery) || 
      (movie.originalTitle && movie.originalTitle.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getMovieBySlug = (slug: string): Movie | undefined => {
    return movies.find(movie => {
      const movieSlug = movie.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return movieSlug === slug;
    });
  };

  const getMoviesByGenre = (genre: string): Movie[] => {
    return movies.filter(movie => 
      movie.genres && movie.genres.some(g => 
        g.toLowerCase().replace(/\s+/g, '-') === genre
      )
    );
  };

  const getMoviesByCountry = (country: string): Movie[] => {
    return movies.filter(movie => 
      movie.countries && movie.countries.some(c => 
        c.toLowerCase().replace(/\s+/g, '-') === country
      )
    );
  };

  const getMoviesByYear = (year: number): Movie[] => {
    return movies.filter(movie => movie.releaseYear === year);
  };

  const value = {
    movies,
    featuredMovie,
    recommendedMovies,
    tvSeries,
    recentMovies,
    isLoading,
    error,
    searchMovies,
    getMovieBySlug,
    getMoviesByGenre,
    getMoviesByCountry,
    getMoviesByYear,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
