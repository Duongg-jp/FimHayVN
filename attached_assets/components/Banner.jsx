import "../assets/css/Banner.css";

export default function Banner() {
  return (
    <div className="container my-4 banner-container">
      <div className="background-banner"></div>
      <div className="row align-items-center banner-row">
        {/* Tiêu đề */}
        <div className="col-md-3">
          <h5 className="fw-bold banner-title">Cậu Bé Bút Chì (2019)</h5>
          <button class="banner-button banner-button-style1">
            <span class="btn-txt">Xem ngay</span>
          </button>
        </div>

        {/* Ảnh chính */}
        <div className="col-md-7 main-banner">
          <img
            src="https://i.pinimg.com/736x/97/f1/04/97f104be82b9afb7f25fbea1cf5f4e9a.jpg"
            alt="Banner"
            className="img-fluid banner-img"
          />
        </div>

        {/* Sub video */}
        <div className="col-md-2 d-flex justify-content-between flex-column gap-2 sub-banner">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src="https://i.pinimg.com/736x/d6/04/97/d604972692acf03aa8b72fc649b715bc.jpg"
              alt={`sub-${index}`}
              className=" sub-img"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
