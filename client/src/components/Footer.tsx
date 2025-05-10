import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-gray-400 py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-montserrat font-bold text-primary mb-4">FilmHay</h2>
            <p className="max-w-md mb-4">Trang xem phim trực tuyến với kho nội dung đa dạng, chất lượng cao và cập nhật liên tục. Trải nghiệm giải trí tuyệt vời mọi lúc, mọi nơi.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fa-brands fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fa-brands fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fa-brands fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Điều hướng</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link></li>
                <li><Link href="/phim-bo" className="hover:text-primary transition-colors">Phim bộ</Link></li>
                <li><Link href="/phim-le" className="hover:text-primary transition-colors">Phim lẻ</Link></li>
                <li><Link href="/phim-chieu-rap" className="hover:text-primary transition-colors">Phim chiếu rạp</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Thể loại nổi bật</h3>
              <ul className="space-y-2">
                <li><Link href="/the-loai/hanh-dong" className="hover:text-primary transition-colors">Hành động</Link></li>
                <li><Link href="/the-loai/tinh-cam" className="hover:text-primary transition-colors">Tình cảm</Link></li>
                <li><Link href="/the-loai/hai-huoc" className="hover:text-primary transition-colors">Hài hước</Link></li>
                <li><Link href="/the-loai/kinh-di" className="hover:text-primary transition-colors">Kinh dị</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Trợ giúp</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/lien-he" className="hover:text-primary transition-colors">Liên hệ</Link></li>
                <li><Link href="/dieu-khoan" className="hover:text-primary transition-colors">Điều khoản sử dụng</Link></li>
                <li><Link href="/chinh-sach" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} FilmHay. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
