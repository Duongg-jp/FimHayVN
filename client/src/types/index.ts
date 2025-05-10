import { Movie } from '@shared/schema';

export interface GenreItem {
  name: string;
  slug: string;
  icon: string;
}

export interface CountryItem {
  name: string;
  slug: string;
}

export interface SearchResult {
  movies: Movie[];
  isLoading: boolean;
  error: Error | null;
}
