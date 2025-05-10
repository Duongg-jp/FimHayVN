import React from "react";
import TheLoaiPhim from "./sub-components/the-loai-phim";
import NutXemTatCa from "./sub-components/nut-xem-tat-ca";
import NutHienThiThem from "./sub-components/nut-hien-thi-them";
import KhoiThePhim from "./KhoiThePhim";
import "../assets/css/Category-list.css";

function CategoryList({ TenTheLoai }) {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <TheLoaiPhim TenTheLoai={TenTheLoai} />
        <NutXemTatCa />
      </div>
      <KhoiThePhim />

      <div className="d-flex justify-content-center my-3">
        <NutHienThiThem />
      </div>
    </div>
  );
}

export default CategoryList;
