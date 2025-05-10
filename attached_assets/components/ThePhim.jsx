import React from "react";

export default function ThePhim() {
  const title = "Shin-chan đi mua giấy vệ sinh";
  const image =
    "https://i.pinimg.com/736x/e2/c8/fc/e2c8fc549c42ce8fd8f2a1facc12948c.jpg";
  const views = "123K";

  return (
    <div className="text-center group">
      <img
        className="img-fluid rounded shadow-sm mb-2"
        src={image}
        alt={title}
        style={{ height: "200px", objectFit: "cover", width: "100%" }}
      />

      <p
        className="fs-6 lh-sm text-start text-break pe-3 pe-lg-4 transition title-truncate text-light"
        title={title}
      >
        {title}
      </p>

      <p className=" text-start small mb-0 text-light">{views} lượt xem</p>
    </div>
  );
}
