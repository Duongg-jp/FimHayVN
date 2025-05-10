import { Link } from 'wouter';

interface GenreItem {
  name: string;
  slug: string;
  icon: string;
}

const genres: GenreItem[] = [
  { name: 'Hành động', slug: 'hanh-dong', icon: 'fa-gun' },
  { name: 'Hài hước', slug: 'hai-huoc', icon: 'fa-face-laugh-beam' },
  { name: 'Tình cảm', slug: 'tinh-cam', icon: 'fa-heart' },
  { name: 'Kinh dị', slug: 'kinh-di', icon: 'fa-ghost' },
  { name: 'Trinh thám', slug: 'trinh-tham', icon: 'fa-magnifying-glass' },
  { name: 'Tâm lý', slug: 'tam-ly', icon: 'fa-brain' },
  { name: 'Khoa học viễn tưởng', slug: 'khoa-hoc-vien-tuong', icon: 'fa-rocket' },
  { name: 'Giả tưởng', slug: 'gia-tuong', icon: 'fa-hat-wizard' },
  { name: 'Hoạt hình', slug: 'hoat-hinh', icon: 'fa-child' },
  { name: 'Gia đình', slug: 'gia-dinh', icon: 'fa-house' },
];

const GenreGrid = () => {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-montserrat font-bold text-white mb-6">Thể Loại Phim</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genres.map((genre, index) => (
          <Link 
            key={index}
            href={`/the-loai/${genre.slug}`} 
            className="bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/40 hover:to-primary/20 rounded-lg p-4 flex flex-col items-center justify-center transition-all hover:scale-105 group"
          >
            <i className={`fa-solid ${genre.icon} text-3xl text-primary mb-2 group-hover:text-white transition-colors`}></i>
            <span className="text-center font-medium text-white">{genre.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GenreGrid;
