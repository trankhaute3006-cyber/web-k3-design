export type ProjectCategory =
  | "nha-pho"
  | "biet-thu"
  | "can-ho"
  | "thuong-mai"
  | "cong-nghiep";

export const categoryLabels: Record<ProjectCategory, string> = {
  "nha-pho": "Nhà phố",
  "biet-thu": "Biệt thự",
  "can-ho": "Căn hộ",
  "thuong-mai": "Thương mại",
  "cong-nghiep": "Công nghiệp",
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string;
  location: string;
  year: number;
  area: string;
  scope: string;
  duration: string;
  cover: string;
  gallery: { src: string; caption: string }[];
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  highlights: string[];
  featured: boolean;
};

/**
 * [SUA] Anh thay anh that vao thu muc /public/images/projects/
 * roi doi duong dan "cover" va "gallery" ben duoi.
 * Anh dang dung la placeholder SVG do he thong tao san.
 */
export const projects: Project[] = [
  {
    slug: "nha-pho-thao-dien",
    title: "Nhà phố Thảo Điền",
    category: "nha-pho",
    client: "Gia đình anh Hưng",
    location: "TP. Thủ Đức, TP.HCM",
    year: 2025,
    area: "1 trệt 3 lầu — 420 m² sàn",
    scope: "Thiết kế kiến trúc + Thi công trọn gói",
    duration: "8 tháng",
    cover: "/images/projects/nha-pho-thao-dien-cover.svg",
    gallery: [
      {
        src: "/images/projects/nha-pho-thao-dien-1.svg",
        caption: "Mặt tiền nhìn từ đường nội bộ",
      },
      {
        src: "/images/projects/nha-pho-thao-dien-2.svg",
        caption: "Giếng trời xuyên suốt bốn tầng",
      },
      {
        src: "/images/projects/nha-pho-thao-dien-3.svg",
        caption: "Không gian bếp và bàn ăn liên thông",
      },
      {
        src: "/images/projects/nha-pho-thao-dien-4.svg",
        caption: "Phòng ngủ chính hướng vườn sau",
      },
    ],
    summary:
      "Nhà phố 4 tầng trên lô đất hẹp 5×20 m, giải quyết bài toán lấy sáng tự nhiên cho toàn bộ chiều sâu công trình.",
    challenge:
      "Lô đất chỉ rộng 5 m và giáp nhà hai bên, phần giữa nhà gần như không có nguồn sáng tự nhiên. Gia chủ có ba thế hệ cùng sống nên cần tách biệt khu vực sinh hoạt của người lớn tuổi và trẻ nhỏ.",
    solution:
      "Chúng tôi đặt một giếng trời lệch tâm chạy suốt bốn tầng, kết hợp cầu thang xương cá bằng thép để ánh sáng lọt xuống tận tầng trệt. Phòng của ông bà được bố trí ở tầng trệt có nhà vệ sinh riêng, tránh phải lên xuống cầu thang.",
    result:
      "Toàn bộ diện tích sử dụng đều có ánh sáng tự nhiên vào ban ngày. Công trình bàn giao đúng tiến độ 8 tháng, chi phí quyết toán chênh 2,1% so với hợp đồng ban đầu.",
    highlights: [
      "Giếng trời lệch tâm xuyên bốn tầng",
      "Mặt tiền lam bê tông cắt nắng hướng Tây",
      "Hệ thống thu và tái sử dụng nước mưa tưới cây",
    ],
    featured: true,
  },
  {
    slug: "biet-thu-long-an",
    title: "Biệt thự vườn Long An",
    category: "biet-thu",
    client: "Gia đình chị Mai",
    location: "Bến Lức, Long An",
    year: 2025,
    area: "1 trệt 1 lầu — 680 m² sàn / 1.200 m² đất",
    scope: "Thiết kế kiến trúc + Nội thất + Thi công",
    duration: "13 tháng",
    cover: "/images/projects/biet-thu-long-an-cover.svg",
    gallery: [
      {
        src: "/images/projects/biet-thu-long-an-1.svg",
        caption: "Khối nhà chính nhìn từ hồ nước",
      },
      {
        src: "/images/projects/biet-thu-long-an-2.svg",
        caption: "Hiên rộng nối phòng khách ra vườn",
      },
      {
        src: "/images/projects/biet-thu-long-an-3.svg",
        caption: "Phòng khách thông tầng",
      },
    ],
    summary:
      "Biệt thự nghỉ dưỡng cuối tuần đặt trên khu đất vườn, ưu tiên thông gió tự nhiên và vật liệu địa phương.",
    challenge:
      "Khu đất trũng, nền yếu và ngập cục bộ vào mùa mưa. Gia chủ muốn hạn chế tối đa việc dùng máy lạnh khi về nghỉ cuối tuần.",
    solution:
      "Nền công trình được tôn cao 1,2 m kết hợp hồ điều tiết nước phía trước, vừa xử lý ngập vừa làm mát luồng gió đi vào nhà. Mặt bằng bố trí dạng chữ L mở về hướng Đông Nam để đón gió chủ đạo, mái dốc lợp ngói có lớp cách nhiệt và khe thông gió đỉnh mái.",
    result:
      "Nhiệt độ trong nhà đo được thấp hơn ngoài trời trung bình 4–5 °C vào buổi trưa mà không cần điều hòa. Không ghi nhận ngập trong hai mùa mưa đầu tiên sau bàn giao.",
    highlights: [
      "Hồ điều tiết kết hợp làm mát thụ động",
      "Gạch nung và gỗ tận dụng từ nhà cũ trên đất",
      "Hệ mái thông gió đỉnh giảm hấp thụ nhiệt",
    ],
    featured: true,
  },
  {
    slug: "can-ho-vinhomes",
    title: "Căn hộ 92 m² Vinhomes",
    category: "can-ho",
    client: "Anh Quân & chị Linh",
    location: "Bình Thạnh, TP.HCM",
    year: 2024,
    area: "92 m² — 3 phòng ngủ",
    scope: "Thiết kế & thi công nội thất",
    duration: "45 ngày",
    cover: "/images/projects/can-ho-vinhomes-cover.svg",
    gallery: [
      {
        src: "/images/projects/can-ho-vinhomes-1.svg",
        caption: "Khu vực khách và bếp liên thông",
      },
      {
        src: "/images/projects/can-ho-vinhomes-2.svg",
        caption: "Tủ âm tường chạy suốt hành lang",
      },
      {
        src: "/images/projects/can-ho-vinhomes-3.svg",
        caption: "Phòng ngủ trẻ em có góc học tập",
      },
    ],
    summary:
      "Cải tạo nội thất căn hộ ba phòng ngủ cho gia đình trẻ, tối ưu lưu trữ mà không làm không gian nặng nề.",
    challenge:
      "Căn hộ bàn giao thô với mặt bằng chia nhỏ, phòng khách chỉ 18 m² nhưng gia chủ cần chỗ chứa lượng đồ đạc của gia đình bốn người.",
    solution:
      "Bỏ vách ngăn giữa bếp và phòng khách, dồn toàn bộ lưu trữ vào hệ tủ âm tường cao kịch trần chạy dọc hành lang. Bảng màu giới hạn ở ba tông sáng để không gian không bị vụn.",
    result:
      "Diện tích lưu trữ tăng khoảng 40% so với phương án tủ rời, khu vực sinh hoạt chung rộng hơn 6 m² so với mặt bằng gốc. Hoàn thiện trong 45 ngày.",
    highlights: [
      "Hệ tủ âm tường kịch trần tối ưu lưu trữ",
      "Bếp và khách liên thông tăng diện tích cảm nhận",
      "Vật liệu chống ẩm cho toàn bộ tủ khu vực bếp",
    ],
    featured: true,
  },
  {
    slug: "van-phong-cong-ty-tan-binh",
    title: "Văn phòng 600 m² Tân Bình",
    category: "thuong-mai",
    client: "Công ty TNHH Đại Phong",
    location: "Tân Bình, TP.HCM",
    year: 2024,
    area: "600 m² — 2 sàn",
    scope: "Thiết kế + Thi công hoàn thiện",
    duration: "4 tháng",
    cover: "/images/projects/van-phong-tan-binh-cover.svg",
    gallery: [
      {
        src: "/images/projects/van-phong-tan-binh-1.svg",
        caption: "Khu làm việc chung sàn 1",
      },
      {
        src: "/images/projects/van-phong-tan-binh-2.svg",
        caption: "Phòng họp lớn và khu pantry",
      },
    ],
    summary:
      "Văn phòng hai sàn cho công ty 80 nhân sự, cân bằng giữa không gian mở và nhu cầu tập trung.",
    challenge:
      "Doanh nghiệp chuyển từ mô hình phòng kín sang không gian mở nhưng lo ngại tiếng ồn ảnh hưởng đến bộ phận kỹ thuật.",
    solution:
      "Phân vùng theo mức độ ồn: khu vực kinh doanh và tiếp khách đặt gần lối vào, bộ phận kỹ thuật lùi vào trong với trần tiêu âm và vách kính hai lớp. Bố trí sáu buồng họp nhỏ rải đều để tránh việc phải đặt lịch phòng họp cho cuộc gọi ngắn.",
    result:
      "Bàn giao đúng tiến độ trước kỳ chuyển văn phòng. Khảo sát nội bộ sau ba tháng ghi nhận mức hài lòng về không gian làm việc đạt 4,4/5.",
    highlights: [
      "Phân vùng âm thanh theo tính chất công việc",
      "Sáu buồng họp nhỏ giảm tải phòng họp lớn",
      "Hệ chiếu sáng theo tiêu chuẩn 400 lux mặt bàn",
    ],
    featured: false,
  },
  {
    slug: "nha-pho-go-vap",
    title: "Nhà phố Gò Vấp",
    category: "nha-pho",
    client: "Anh Tuấn",
    location: "Gò Vấp, TP.HCM",
    year: 2024,
    area: "1 trệt 2 lầu — 260 m² sàn",
    scope: "Cải tạo toàn bộ",
    duration: "5 tháng",
    cover: "/images/projects/nha-pho-go-vap-cover.svg",
    gallery: [
      {
        src: "/images/projects/nha-pho-go-vap-1.svg",
        caption: "Mặt tiền sau cải tạo",
      },
      {
        src: "/images/projects/nha-pho-go-vap-2.svg",
        caption: "Cầu thang mới lấy sáng từ mái",
      },
    ],
    summary:
      "Cải tạo căn nhà 22 năm tuổi bị thấm dột nặng, giữ nguyên kết cấu chính để tiết kiệm chi phí.",
    challenge:
      "Nhà xuống cấp với thấm tường ba mặt, hệ điện cũ không đủ tải. Chủ nhà muốn giữ chi phí dưới mức xây mới.",
    solution:
      "Kiểm định cho thấy khung bê tông còn tốt nên chúng tôi giữ lại toàn bộ kết cấu, chỉ thay hệ bao che, chống thấm ngược và đi lại toàn bộ hệ điện nước. Mở thêm ô lấy sáng trên mái cho khu vực cầu thang.",
    result:
      "Chi phí cải tạo bằng khoảng 55% so với phương án đập đi xây lại. Không còn hiện tượng thấm sau hai mùa mưa.",
    highlights: [
      "Giữ nguyên khung kết cấu, tiết kiệm 45% chi phí",
      "Chống thấm ngược toàn bộ tường tiếp giáp",
      "Nâng cấp hệ điện đạt chuẩn tải hiện đại",
    ],
    featured: false,
  },
  {
    slug: "nha-xuong-binh-duong",
    title: "Nhà xưởng 2.400 m² Bình Dương",
    category: "cong-nghiep",
    client: "Công ty CP Sản xuất Minh Long",
    location: "Bến Cát, Bình Dương",
    year: 2023,
    area: "2.400 m² xưởng + 300 m² văn phòng",
    scope: "Thiết kế + Thi công + Hoàn công",
    duration: "7 tháng",
    cover: "/images/projects/nha-xuong-binh-duong-cover.svg",
    gallery: [
      {
        src: "/images/projects/nha-xuong-binh-duong-1.svg",
        caption: "Khung thép tiền chế nhịp 24 m",
      },
      {
        src: "/images/projects/nha-xuong-binh-duong-2.svg",
        caption: "Khối văn phòng điều hành",
      },
    ],
    summary:
      "Nhà xưởng khung thép tiền chế kèm khối văn phòng điều hành, thiết kế theo yêu cầu dây chuyền sản xuất.",
    challenge:
      "Chủ đầu tư cần đưa dây chuyền vào vận hành trước quý IV để kịp đơn hàng xuất khẩu, trong khi hồ sơ pháp lý đất chưa hoàn tất.",
    solution:
      "Triển khai song song hồ sơ pháp lý và thiết kế kỹ thuật. Chọn giải pháp khung thép tiền chế nhịp 24 m không cột giữa để gia công tại xưởng trong lúc chờ giấy phép, rút ngắn thời gian thi công tại hiện trường.",
    result:
      "Bàn giao trước kế hoạch 3 tuần, kịp lắp đặt dây chuyền cho đơn hàng quý IV. Hồ sơ hoàn công được duyệt trong vòng một tháng sau bàn giao.",
    highlights: [
      "Khung thép nhịp 24 m không cột giữa",
      "Thi công song song với hoàn thiện pháp lý",
      "Hệ thông gió mái và làm mát bay hơi cho xưởng",
    ],
    featured: false,
  },
  {
    slug: "biet-thu-song-lap-binh-chanh",
    title: "Biệt thự song lập Bình Chánh",
    category: "biet-thu",
    client: "Gia đình anh Đức",
    location: "Bình Chánh, TP.HCM",
    year: 2023,
    area: "1 trệt 2 lầu — 510 m² sàn",
    scope: "Thiết kế kiến trúc + Giám sát",
    duration: "11 tháng",
    cover: "/images/projects/biet-thu-binh-chanh-cover.svg",
    gallery: [
      {
        src: "/images/projects/biet-thu-binh-chanh-1.svg",
        caption: "Khối mặt tiền và sân trước",
      },
      {
        src: "/images/projects/biet-thu-binh-chanh-2.svg",
        caption: "Sảnh thông tầng",
      },
    ],
    summary:
      "Biệt thự song lập trong khu compound, tối ưu riêng tư khi chỉ có một mặt thoáng phía trước.",
    challenge:
      "Căn song lập chung tường với nhà bên, ba mặt còn lại bị giới hạn khoảng lùi theo quy hoạch khu.",
    solution:
      "Tổ chức một sân trong ở giữa nhà làm lõi thông gió và lấy sáng, đồng thời tạo khoảng đệm riêng tư giữa khu sinh hoạt chung và phòng ngủ.",
    result:
      "Toàn bộ phòng ngủ đều tiếp xúc trực tiếp với sân trong hoặc mặt tiền. Chủ nhà giới thiệu thêm hai công trình trong cùng khu.",
    highlights: [
      "Sân trong làm lõi thông gió và lấy sáng",
      "Tường chung xử lý cách âm hai lớp",
      "Vật liệu mặt tiền thống nhất với quy chế khu",
    ],
    featured: false,
  },
  {
    slug: "showroom-quan-7",
    title: "Showroom nội thất Quận 7",
    category: "thuong-mai",
    client: "Thương hiệu nội thất An Home",
    location: "Quận 7, TP.HCM",
    year: 2023,
    area: "380 m²",
    scope: "Thiết kế + Thi công hoàn thiện",
    duration: "3 tháng",
    cover: "/images/projects/showroom-quan-7-cover.svg",
    gallery: [
      {
        src: "/images/projects/showroom-quan-7-1.svg",
        caption: "Khu trưng bày chính",
      },
      {
        src: "/images/projects/showroom-quan-7-2.svg",
        caption: "Góc tư vấn khách hàng",
      },
    ],
    summary:
      "Showroom trưng bày nội thất, thiết kế theo lộ trình tham quan dẫn khách đi hết không gian.",
    challenge:
      "Mặt bằng dài và hẹp khiến khách thường chỉ xem khu vực gần cửa rồi quay ra.",
    solution:
      "Bố trí các cụm trưng bày lệch nhau theo hình zíc-zắc và đặt điểm nhấn ánh sáng ở cuối lộ trình để dẫn thị giác khách vào sâu bên trong.",
    result:
      "Thời gian khách lưu lại showroom tăng đáng kể theo ghi nhận của chủ đầu tư sau ba tháng vận hành.",
    highlights: [
      "Lộ trình tham quan dẫn hướng bằng ánh sáng",
      "Hệ ray đèn linh hoạt đổi bố cục trưng bày",
      "Nền bê tông mài giảm chi phí bảo trì",
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
