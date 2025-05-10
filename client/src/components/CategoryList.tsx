import { useState, useRef } from 'react';
import { Link } from 'wouter';
import { Movie } from '@shared/schema';
import MovieCard from './MovieCard';
import { Skeleton } from './Skeleton';

interface CategoryListProps {
  title: string;
  movies: Movie[];
  viewAllLink: string;
  isLoading?: boolean;
}

const CategoryList = ({ title, movies, viewAllLink, isLoading = false }: CategoryListProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = 200 + 16; // card width + gap
    const scrollAmount = cardWidth * 3; // scroll 3 cards at a time
    
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-montserrat font-bold text-white">{title}</h2>
        <Link 
          href={viewAllLink} 
          className="text-primary hover:text-pink-400 transition-colors flex items-center text-sm font-medium"
        >
          Xem tất cả <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
        </Link>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 category-scrollbar"
        >
          <div className="flex gap-4">
            {isLoading ? (
              // Skeleton loading state
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="min-w-[180px] md:min-w-[200px]">
                  <div className="aspect-[2/3] w-full">
                    <Skeleton className="w-full h-full rounded-lg" />
                  </div>
                  <Skeleton className="mt-2 h-4 w-3/4" />
                  <Skeleton className="mt-1 h-3 w-1/2" />
                </div>
              ))
            ) : (
              // Actual movie cards
              movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))
            )}
          </div>
        </div>
        
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#121212]/80 hover:bg-primary/80 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 focus:outline-none"
          onClick={() => scroll('left')}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#121212]/80 hover:bg-primary/80 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 focus:outline-none"
          onClick={() => scroll('right')}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default CategoryList;
