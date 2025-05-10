import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import SearchBox from './SearchBox';

const Header = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [location] = useLocation();
  
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const countries = [
    "Việt Nam",
    "Hàn Quốc",
    "Nhật Bản",
    "Trung Quốc",
    "Mỹ",
    "Anh",
    "Pháp",
    "Thái Lan",
    "Ấn Độ",
    "Đài Loan",
  ];

  const genres = [
    "Hành động",
    "Hài hước",
    "Tình cảm",
    "Kinh dị",
    "Trinh thám",
    "Tâm lý",
    "Khoa học viễn tưởng",
    "Giả tưởng",
    "Hoạt hình",
    "Gia đình",
    "Âm nhạc",
    "Chiến tranh",
    "Tài liệu",
    "Chính trị",
    "Phiêu lưu",
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(e.target as Node) && 
          e.target !== document.getElementById('mobile-menu-button')) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setShowMobileMenu(false);
  }, [location]);

  const toUrlFormat = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#121212]/90 backdrop-blur-sm' : 'bg-gradient-to-b from-[#121212] to-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto mb-3 md:mb-0">
          <Link href="/" className="text-2xl font-montserrat font-bold text-primary hover:text-pink-400 transition-colors">
            FilmHay
          </Link>
          <button 
            id="mobile-menu-button"
            className="md:hidden text-white" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
        
        <div className="hidden md:flex flex-col md:flex-row w-full md:items-center md:justify-between">
          <ul className="flex flex-col md:flex-row gap-1 md:gap-3 md:items-center md:mx-auto">
            <li className="nav-item">
              <Link href="/phim-bo" className="block py-2 px-3 text-white hover:text-primary transition-colors">Phim bộ</Link>
            </li>
            <li className="nav-item">
              <Link href="/phim-le" className="block py-2 px-3 text-white hover:text-primary transition-colors">Phim lẻ</Link>
            </li>
            <li className="nav-item">
              <Link href="/phim-chieu-rap" className="block py-2 px-3 text-white hover:text-primary transition-colors">Phim chiếu rạp</Link>
            </li>
            
            {/* Quốc gia dropdown */}
            <li className="nav-item relative group">
              <div 
                className="block py-2 px-3 text-white hover:text-primary transition-colors flex items-center cursor-pointer"
                onMouseEnter={() => setShowCountries(true)}
                onMouseLeave={() => setShowCountries(false)}
              >
                Quốc gia
                <i className="fa-solid fa-chevron-down ml-1 text-xs group-hover:rotate-180 transition-transform"></i>
              </div>
              {showCountries && (
                <div className="absolute top-full left-0 mt-1 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-lg z-50 w-48 custom-dropdown fade-in">
                  <div className="py-1">
                    {countries.map((country, index) => (
                      <Link 
                        key={index} 
                        href={`/quoc-gia/${toUrlFormat(country)}`}
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-primary hover:text-white"
                      >
                        {country}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
            
            {/* Năm phát hành dropdown */}
            <li className="nav-item relative group">
              <div 
                className="block py-2 px-3 text-white hover:text-primary transition-colors flex items-center cursor-pointer"
                onMouseEnter={() => setShowYears(true)}
                onMouseLeave={() => setShowYears(false)}
              >
                Năm phát hành
                <i className="fa-solid fa-chevron-down ml-1 text-xs group-hover:rotate-180 transition-transform"></i>
              </div>
              {showYears && (
                <div className="absolute top-full left-0 mt-1 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-lg z-50 w-36 custom-dropdown fade-in">
                  <div className="py-1">
                    {years.map((year, index) => (
                      <Link 
                        key={index} 
                        href={`/nam/${year}`}
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-primary hover:text-white"
                      >
                        {year}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
            
            {/* Thể loại dropdown */}
            <li className="nav-item relative group">
              <div 
                className="block py-2 px-3 text-white hover:text-primary transition-colors flex items-center cursor-pointer"
                onMouseEnter={() => setShowGenres(true)}
                onMouseLeave={() => setShowGenres(false)}
              >
                Thể loại
                <i className="fa-solid fa-chevron-down ml-1 text-xs group-hover:rotate-180 transition-transform"></i>
              </div>
              {showGenres && (
                <div className="absolute top-full left-0 mt-1 bg-[#1e1e1e] border border-gray-700 rounded-md shadow-lg z-50 w-48 custom-dropdown fade-in">
                  <div className="py-1">
                    {genres.map((genre, index) => (
                      <Link 
                        key={index} 
                        href={`/the-loai/${toUrlFormat(genre)}`}
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-primary hover:text-white"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>
          
          <div className="relative mt-3 md:mt-0 w-full md:w-auto">
            <SearchBox />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 bg-[#121212] z-50 transform transition-transform duration-300 ease-in-out ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button 
            className="text-white"
            onClick={() => setShowMobileMenu(false)}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>
        
        <div className="px-4 py-6">
          <Link 
            href="/" 
            className="text-2xl font-montserrat font-bold text-primary block mb-6"
            onClick={() => setShowMobileMenu(false)}
          >
            FilmHay
          </Link>
          
          <div className="relative mb-6">
            <SearchBox isMobile onSearch={() => setShowMobileMenu(false)} />
          </div>
          
          <ul className="space-y-4">
            <li>
              <Link 
                href="/phim-bo" 
                className="block py-2 text-white hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Phim bộ
              </Link>
            </li>
            <li>
              <Link 
                href="/phim-le" 
                className="block py-2 text-white hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Phim lẻ
              </Link>
            </li>
            <li>
              <Link 
                href="/phim-chieu-rap" 
                className="block py-2 text-white hover:text-primary transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Phim chiếu rạp
              </Link>
            </li>
            
            {/* Mobile country dropdown */}
            <li className="py-2">
              <div 
                className="flex items-center justify-between text-white cursor-pointer"
                onClick={() => setShowCountries(!showCountries)}
              >
                <span>Quốc gia</span>
                <i className={`fa-solid ${showCountries ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </div>
              {showCountries && (
                <ul className="mt-2 ml-4 space-y-2">
                  {countries.map((country, index) => (
                    <li key={index}>
                      <Link 
                        href={`/quoc-gia/${toUrlFormat(country)}`}
                        className="text-gray-300 hover:text-primary"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {country}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            
            {/* Mobile year dropdown */}
            <li className="py-2">
              <div 
                className="flex items-center justify-between text-white cursor-pointer"
                onClick={() => setShowYears(!showYears)}
              >
                <span>Năm phát hành</span>
                <i className={`fa-solid ${showYears ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </div>
              {showYears && (
                <ul className="mt-2 ml-4 space-y-2">
                  {years.slice(0, 10).map((year, index) => (
                    <li key={index}>
                      <Link 
                        href={`/nam/${year}`}
                        className="text-gray-300 hover:text-primary"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {year}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            
            {/* Mobile genre dropdown */}
            <li className="py-2">
              <div 
                className="flex items-center justify-between text-white cursor-pointer"
                onClick={() => setShowGenres(!showGenres)}
              >
                <span>Thể loại</span>
                <i className={`fa-solid ${showGenres ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </div>
              {showGenres && (
                <ul className="mt-2 ml-4 space-y-2">
                  {genres.slice(0, 10).map((genre, index) => (
                    <li key={index}>
                      <Link 
                        href={`/the-loai/${toUrlFormat(genre)}`}
                        className="text-gray-300 hover:text-primary"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {genre}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
