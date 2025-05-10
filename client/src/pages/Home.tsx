import { useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import GenreGrid from '../components/GenreGrid';

const Home = () => {
  const { 
    featuredMovie, 
    recommendedMovies, 
    tvSeries, 
    recentMovies,
    isLoading
  } = useMovies();

  useEffect(() => {
    document.title = 'FilmHay - Kho phim trực tuyến hàng đầu';
  }, []);

  return (
    <>
      <Banner movie={featuredMovie} isLoading={isLoading} />
      
      <CategoryList 
        title="Phim Đề Xuất" 
        movies={recommendedMovies} 
        viewAllLink="/phim-de-xuat"
        isLoading={isLoading}
      />
      
      <CategoryList 
        title="Phim Bộ Mới Cập Nhật" 
        movies={tvSeries} 
        viewAllLink="/phim-bo"
        isLoading={isLoading}
      />
      
      <CategoryList 
        title="Phim Lẻ Mới Cập Nhật" 
        movies={recentMovies} 
        viewAllLink="/phim-le"
        isLoading={isLoading}
      />
      
      <GenreGrid />
    </>
  );
};

export default Home;
