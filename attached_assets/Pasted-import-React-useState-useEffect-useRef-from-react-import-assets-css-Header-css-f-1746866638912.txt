import React, { useState, useEffect, useRef } from "react";
import "../assets/css/Header.css";

function Header() {
  const [showGenres, setShowGenres] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const searchBoxRef = useRef(null);

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

    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        searchBoxRef.current.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav className="navbar navbar-expand-lg navbar-light px-4 position-relative">
        <a className="navbar-brand fw-bold text-light title-web" href="/">
          FimHay
        </a>

        <ul className="navbar-nav mx-auto d-flex flex-row gap-3 align-items-center justify-content-center">
          <li className="nav-item">
            <a className="nav-link active text-light" href="Phim-bo">
              Phim bộ
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="Phim-le">
              Phim lẻ
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-light" href="Phim-chieu-rap">
              Phim chiếu rạp
            </a>
          </li>
          <li
            className="nav-item me-3 position-relative"
            onMouseEnter={() => setShowCountries(true)}
            onMouseLeave={() => setShowCountries(false)}
            style={{ cursor: "pointer" }}
          >
            <a className="nav-link text-light">Quốc gia</a>
            {showCountries && (
              <ul className="custom-dropdown">
                {countries.map((countrie, index) => (
                  <li className="custom-dropdown-item" key={index}>
                    <a href={`/nam/${countrie}`}>{countrie}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li
            className="nav-item me-3 position-relative"
            onMouseEnter={() => setShowYears(true)}
            onMouseLeave={() => setShowYears(false)}
            style={{ cursor: "pointer" }}
          >
            <a className="nav-link text-light">
              Năm phát hành{" "}
              <i className="fa-solid fa-chevron-down text-light"></i>
            </a>
            {showYears && (
              <ul className="custom-dropdown">
                {years.map((year, index) => (
                  <li className="custom-dropdown-item" key={index}>
                    <a href={`/nam/${year}`}>{year}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li
            className="nav-item me-3 position-relative"
            onMouseEnter={() => setShowGenres(true)}
            onMouseLeave={() => setShowGenres(false)}
            style={{ cursor: "pointer" }}
          >
            <a className="nav-link text-light">
              Thể loại <i className="fa-solid fa-chevron-down text-light"></i>
            </a>
            {showGenres && (
              <ul className="custom-dropdown">
                {genres.map((genre, index) => (
                  <li className="custom-dropdown-item" key={index}>
                    <a
                      href={`/the-loai/${genre
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {genre}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="nav-item me-3">
            <input type="text" placeholder="Tìm kiếm..." />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
