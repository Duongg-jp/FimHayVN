import { 
  users, 
  type User, 
  type InsertUser, 
  movies, 
  type Movie, 
  type InsertMovie 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Movie related methods
  getAllMovies(): Promise<Movie[]>;
  getMovieById(id: number): Promise<Movie | undefined>;
  getMoviesByType(type: string): Promise<Movie[]>;
  getMoviesByGenre(genre: string): Promise<Movie[]>;
  getMoviesByCountry(country: string): Promise<Movie[]>;
  getMoviesByYear(year: number): Promise<Movie[]>;
  searchMovies(query: string): Promise<Movie[]>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  updateMovie(id: number, movie: Partial<InsertMovie>): Promise<Movie | undefined>;
  deleteMovie(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private moviesList: Map<number, Movie>;
  private userCurrentId: number;
  private movieCurrentId: number;

  constructor() {
    this.users = new Map();
    this.moviesList = new Map();
    this.userCurrentId = 1;
    this.movieCurrentId = 1;
    
    // Add some initial movies for demonstration
    this.initializeMovies();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Movie methods
  async getAllMovies(): Promise<Movie[]> {
    return Array.from(this.moviesList.values());
  }

  async getMovieById(id: number): Promise<Movie | undefined> {
    return this.moviesList.get(id);
  }

  async getMoviesByType(type: string): Promise<Movie[]> {
    return Array.from(this.moviesList.values()).filter(
      (movie) => movie.type === type
    );
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    return Array.from(this.moviesList.values()).filter(
      (movie) => movie.genres && movie.genres.includes(genre)
    );
  }

  async getMoviesByCountry(country: string): Promise<Movie[]> {
    return Array.from(this.moviesList.values()).filter(
      (movie) => movie.countries && movie.countries.includes(country)
    );
  }

  async getMoviesByYear(year: number): Promise<Movie[]> {
    return Array.from(this.moviesList.values()).filter(
      (movie) => movie.releaseYear === year
    );
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.moviesList.values()).filter(
      (movie) => 
        movie.title.toLowerCase().includes(lowercaseQuery) || 
        (movie.originalTitle && movie.originalTitle.toLowerCase().includes(lowercaseQuery))
    );
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const id = this.movieCurrentId++;
    const now = new Date();
    const movie: Movie = { 
      ...insertMovie, 
      id,
      createdAt: now
    };
    this.moviesList.set(id, movie);
    return movie;
  }

  async updateMovie(id: number, movieData: Partial<InsertMovie>): Promise<Movie | undefined> {
    const existingMovie = this.moviesList.get(id);
    if (!existingMovie) {
      return undefined;
    }

    const updatedMovie: Movie = { ...existingMovie, ...movieData };
    this.moviesList.set(id, updatedMovie);
    return updatedMovie;
  }

  async deleteMovie(id: number): Promise<boolean> {
    return this.moviesList.delete(id);
  }

  // Initialize with some sample data
  private initializeMovies() {
    const sampleMovies: InsertMovie[] = [
      {
        title: "Dune: Part Two",
        originalTitle: "Dune: Part Two",
        posterUrl: "https://pixabay.com/get/g2ea0c934b252f8f3be2b16cf0a3c6d301590ba9e7c0d4baf9e4dadf34f7859370cb79412e9bb345b99566a2c664123efdbc64da7398546983d0ec203744713fc_1280.jpg",
        backdropUrl: "https://pixabay.com/get/g2ea0c934b252f8f3be2b16cf0a3c6d301590ba9e7c0d4baf9e4dadf34f7859370cb79412e9bb345b99566a2c664123efdbc64da7398546983d0ec203744713fc_1280.jpg",
        overview: "Paul Atreides hợp tác với Chani và những người Fremen trong hành trình trả thù những kẻ đã hủy hoại gia đình anh. Đối mặt với lựa chọn giữa tình yêu của đời mình và số phận của vũ trụ đã biết, anh phấn đấu để ngăn chặn một tương lai khủng khiếp.",
        releaseYear: 2024,
        rating: 85,
        duration: 166,
        type: "movie",
        genres: ["Khoa học viễn tưởng", "Phiêu lưu"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
      },
      {
        title: "Inception",
        originalTitle: "Inception",
        posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Dom Cobb là một tên trộm có khả năng đặc biệt trong việc chiếm đoạt bí mật từ trong tiềm thức của con người khi họ mơ. Khả năng hiếm có này đã khiến anh trở thành một công cụ quyền lực trong thế giới của những kẻ đi đánh cắp thông tin doanh nghiệp.",
        releaseYear: 2010,
        rating: 92,
        duration: 148,
        type: "movie",
        genres: ["Khoa học viễn tưởng", "Hành động", "Phiêu lưu"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      },
      {
        title: "The Dark Knight",
        originalTitle: "The Dark Knight",
        posterUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Batman kết hợp cùng Cảnh sát trưởng Gordon và Luật sư Harvey Dent để triệt phá các tổ chức tội phạm đang tung hoành tại Gotham. Họ ban đầu đã có những thành công, nhưng không lâu sau đó lại trở thành con mồi của một kẻ tội phạm hỗn loạn được biết đến với cái tên Joker.",
        releaseYear: 2008,
        rating: 90,
        duration: 152,
        type: "movie",
        genres: ["Hành động", "Tội phạm", "Giả tưởng"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      },
      {
        title: "Ký Sinh Trùng",
        originalTitle: "Parasite",
        posterUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Gia đình nghèo Ki-taek có cuộc sống bấp bênh, làm những công việc tạm bợ để kiếm sống. Một ngày, con trai cả Ki-woo được bạn giới thiệu làm gia sư tiếng Anh cho con gái của gia đình giàu có Park. Gia đình Ki-taek dần dần thâm nhập vào gia đình Park và bắt đầu một mối quan hệ phức tạp.",
        releaseYear: 2019,
        rating: 86,
        duration: 132,
        type: "movie",
        genres: ["Tâm lý", "Trinh thám", "Hài hước"],
        countries: ["Hàn Quốc"],
        trailerUrl: "https://www.youtube.com/watch?v=isOGD_7hNIY",
      },
      {
        title: "Mad Max: Fury Road",
        originalTitle: "Mad Max: Fury Road",
        posterUrl: "https://images.unsplash.com/photo-1559583109-3e7968136c99?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1559583109-3e7968136c99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Trong một thế giới sa mạc hậu tận thế, nơi nhân loại đấu tranh để sống sót, hai kẻ nổi loạn có thể khôi phục trật tự. Max, một người đàn ông ít nói đang tìm kiếm sự bình yên sau khi mất vợ và con, và Furiosa, một người phụ nữ tìm cách sống sót khi trở về quê hương.",
        releaseYear: 2015,
        rating: 81,
        duration: 120,
        type: "movie",
        genres: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
        countries: ["Úc", "Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
      },
      {
        title: "Spider-Man: Into the Spider-Verse",
        originalTitle: "Spider-Man: Into the Spider-Verse",
        posterUrl: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Thiếu niên Miles Morales trở thành Người Nhện của vũ trụ của mình, và phải học cách tham gia cùng những Người Nhện từ các chiều không gian khác nhau để đánh bại một mối đe dọa cho tất cả các thực tại.",
        releaseYear: 2018,
        rating: 84,
        duration: 117,
        type: "movie",
        genres: ["Hoạt hình", "Hành động", "Phiêu lưu"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=g4Hbz2jLxvQ",
      },
      {
        title: "Interstellar",
        originalTitle: "Interstellar",
        posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Một nhóm nhà thám hiểm liên ngành đi du hành qua một lỗ sâu không gian trong một nỗ lực nhằm đảm bảo sự sống còn của nhân loại trong một hành tinh Trái Đất đang chết dần.",
        releaseYear: 2014,
        rating: 87,
        duration: 169,
        type: "movie",
        genres: ["Khoa học viễn tưởng", "Phiêu lưu", "Tâm lý"],
        countries: ["Mỹ", "Anh"],
        trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      },
      {
        title: "Trò Chơi Con Mực",
        originalTitle: "Squid Game",
        posterUrl: "https://pixabay.com/get/g64c1e413178c157ba7a14684d70dcb23691f81e296f86d10347846c49e64e3863510777b5f16393053eec17aa256890c5c7fbd06536f4af41e7539b6b32f23e3_1280.jpg",
        backdropUrl: "https://pixabay.com/get/g64c1e413178c157ba7a14684d70dcb23691f81e296f86d10347846c49e64e3863510777b5f16393053eec17aa256890c5c7fbd06536f4af41e7539b6b32f23e3_1280.jpg",
        overview: "Hàng trăm người chơi khánh kiệt nhận lời tham gia một trò chơi sống còn kỳ lạ. Đón chờ họ là tiền thưởng kếch xù nhưng đổi lại là mất mạng nếu thua cuộc.",
        releaseYear: 2021,
        rating: 80,
        duration: 60,
        type: "series",
        genres: ["Tâm lý", "Kinh dị", "Hành động"],
        countries: ["Hàn Quốc"],
        trailerUrl: "https://www.youtube.com/watch?v=oqxAJKy0ii4",
        episodeCount: 9,
        currentEpisode: 9,
      },
      {
        title: "Stranger Things",
        originalTitle: "Stranger Things",
        posterUrl: "https://pixabay.com/get/g4641ba34e5b4fe4c40894d8a2ad092b2bd4fa1f0efdea5ba546ce249adde1f5810fd2bb883934293abde43d10067626b89293dbc5214a55283e6308d09c7b757_1280.jpg",
        backdropUrl: "https://pixabay.com/get/g4641ba34e5b4fe4c40894d8a2ad092b2bd4fa1f0efdea5ba546ce249adde1f5810fd2bb883934293abde43d10067626b89293dbc5214a55283e6308d09c7b757_1280.jpg",
        overview: "Khi một cậu bé mất tích, cả thị trấn nhỏ phải đối mặt với những bí ẩn liên quan đến các thí nghiệm bí mật, lực lượng siêu nhiên đáng sợ và một cô bé kỳ lạ.",
        releaseYear: 2016,
        rating: 87,
        duration: 50,
        type: "series",
        genres: ["Giả tưởng", "Kinh dị", "Tâm lý"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
        episodeCount: 8,
        currentEpisode: 8,
      },
      {
        title: "Breaking Bad",
        originalTitle: "Breaking Bad",
        posterUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Một giáo viên hóa học trung học được chẩn đoán bị ung thư phổi bắt đầu sản xuất và bán methamphetamine để đảm bảo tương lai tài chính của gia đình.",
        releaseYear: 2008,
        rating: 95,
        duration: 50,
        type: "series",
        genres: ["Tội phạm", "Tâm lý", "Trinh thám"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
        episodeCount: 62,
        currentEpisode: 62,
      },
      {
        title: "Trò Chơi Vương Quyền",
        originalTitle: "Game of Thrones",
        posterUrl: "https://pixabay.com/get/gb8f92c3404bb6694735473fe044d77aaa912061457de753b26a79a201c11d5166f78a08acc1c6e3bf6c6f86b37196fe02e855dba6db222d008fe1393a60b522d_1280.jpg",
        backdropUrl: "https://pixabay.com/get/gb8f92c3404bb6694735473fe044d77aaa912061457de753b26a79a201c11d5166f78a08acc1c6e3bf6c6f86b37196fe02e855dba6db222d008fe1393a60b522d_1280.jpg",
        overview: "Bảy gia tộc quý tộc đấu tranh để kiểm soát vùng đất huyền thoại Westeros, trong khi một kẻ thù cổ xưa trở lại sau hàng ngàn năm ngủ đông.",
        releaseYear: 2011,
        rating: 92,
        duration: 60,
        type: "series",
        genres: ["Giả tưởng", "Phiêu lưu", "Hành động"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=KPLWWIOCOOQ",
        episodeCount: 73,
        currentEpisode: 73,
      },
      {
        title: "Xác Sống",
        originalTitle: "The Walking Dead",
        posterUrl: "https://pixabay.com/get/g7a3d1e2837eb8dddfe7dfcc8d50121da6e220fbe8155504b6dfa8d124c20b8626f57fbea9befc5439abf5993fdde12cd352cc23170e33ea75403db58bd1f8ee7_1280.jpg",
        backdropUrl: "https://pixabay.com/get/g7a3d1e2837eb8dddfe7dfcc8d50121da6e220fbe8155504b6dfa8d124c20b8626f57fbea9befc5439abf5993fdde12cd352cc23170e33ea75403db58bd1f8ee7_1280.jpg",
        overview: "Phó cảnh sát trưởng Rick Grimes tỉnh dậy từ hôn mê để khám phá ra thế giới bị xác sống thống trị. Anh dẫn đầu một nhóm người sống sót đi tìm nơi an toàn và phương tiện để sống sót trong thế giới hậu khải huyền.",
        releaseYear: 2010,
        rating: 81,
        duration: 45,
        type: "series",
        genres: ["Kinh dị", "Tâm lý", "Phiêu lưu"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=sfAc2U20uyg",
        episodeCount: 24,
        currentEpisode: 24,
      },
      {
        title: "Hạ Cánh Nơi Anh",
        originalTitle: "Crash Landing on You",
        posterUrl: "https://pixabay.com/get/g69894df39007a3153f1f2281346534494b38e73d6c6173966b8cf48ea183a8dd35e7cba46e7e8d5a4ddb172a1125dfdd6fa1835cbdcd4acdbdd47cdff77327df_1280.jpg",
        backdropUrl: "https://pixabay.com/get/g69894df39007a3153f1f2281346534494b38e73d6c6173966b8cf48ea183a8dd35e7cba46e7e8d5a4ddb172a1125dfdd6fa1835cbdcd4acdbdd47cdff77327df_1280.jpg",
        overview: "Một người thừa kế tập đoàn Hàn Quốc bất ngờ hạ cánh ở Bắc Triều Tiên vì một tai nạn nhảy dù. Cô gặp một sĩ quan quân đội Bắc Triều Tiên, người giúp đỡ cô ẩn náu.",
        releaseYear: 2019,
        rating: 87,
        duration: 70,
        type: "series",
        genres: ["Tình cảm", "Hài hước", "Tâm lý"],
        countries: ["Hàn Quốc"],
        trailerUrl: "https://www.youtube.com/watch?v=eXMjTXL2Vks",
        episodeCount: 16,
        currentEpisode: 16,
      },
      {
        title: "Ma Trận",
        originalTitle: "The Matrix",
        posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Một hacker máy tính phát hiện ra từ những kẻ nổi dậy bí ẩn về thực tế thật của cuộc sống của anh ta và vai trò của anh ta trong cuộc chiến chống lại những kẻ kiểm soát của nó.",
        releaseYear: 1999,
        rating: 87,
        duration: 136,
        type: "movie",
        genres: ["Hành động", "Khoa học viễn tưởng"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
      },
      {
        title: "Biệt Đội Siêu Anh Hùng",
        originalTitle: "The Avengers",
        posterUrl: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Nick Fury của S.H.I.E.L.D. tập hợp một đội ngũ gồm các siêu anh hùng để giúp cứu Trái đất khỏi Loki và đạo quân ngoài hành tinh của hắn.",
        releaseYear: 2012,
        rating: 80,
        duration: 143,
        type: "movie",
        genres: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
      },
      {
        title: "Bố Già",
        originalTitle: "The Godfather",
        posterUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Câu chuyện về gia đình mafia gốc Ý Corleone từ năm 1945 đến 1955, tập trung vào sự chuyển đổi của Michael Corleone từ một người ngoài gia đình không muốn tham gia vào các hoạt động tội phạm của gia đình đến một trùm mafia tàn nhẫn.",
        releaseYear: 1972,
        rating: 92,
        duration: 175,
        type: "movie",
        genres: ["Tội phạm", "Tâm lý"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA",
      },
      {
        title: "Joker",
        originalTitle: "Joker",
        posterUrl: "https://images.unsplash.com/photo-1559583109-3e7968136c99?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1559583109-3e7968136c99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "Ở Gotham City, diễn viên hài thất bại Arthur Fleck bị xã hội cô lập và bỏ rơi. Anh bắt đầu đi trên con đường suy sụp, chuyển từ cuộc sống khổ cực sang một tồn tại tội ác kinh hoàng.",
        releaseYear: 2019,
        rating: 84,
        duration: 122,
        type: "movie",
        genres: ["Tội phạm", "Tâm lý", "Kinh dị"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
      },
      {
        title: "1917",
        originalTitle: "1917",
        posterUrl: "https://images.unsplash.com/photo-1568283661163-c90193fd13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1568283661163-c90193fd13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "April 6th, 1917. Khi một cuộc tấn công tưởng chừng sẽ là chiến thắng hóa ra lại là một cái bẫy tinh vi, hai người lính trẻ Anh phải đưa một thông điệp quan trọng sâu vào lãnh thổ địch, có thể cứu 1600 đồng đội.",
        releaseYear: 2019,
        rating: 83,
        duration: 119,
        type: "movie",
        genres: ["Chiến tranh", "Tâm lý", "Hành động"],
        countries: ["Anh", "Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=YqNYrYUiMfg",
      },
      {
        title: "Chiến Binh Báo Đen",
        originalTitle: "Black Panther",
        posterUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        backdropUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        overview: "T'Challa, người thừa kế vương quốc Wakanda ẩn giấu nhưng tiên tiến, phải bước lên để dẫn dắt người dân của mình vào một kỷ nguyên mới và phải đối mặt với một kẻ thách thức từ quá khứ của đất nước mình.",
        releaseYear: 2018,
        rating: 73,
        duration: 134,
        type: "movie",
        genres: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
        countries: ["Mỹ"],
        trailerUrl: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
      }
    ];

    // Add all sample movies
    sampleMovies.forEach(movie => {
      this.createMovie(movie);
    });
  }
}

export const storage = new MemStorage();
