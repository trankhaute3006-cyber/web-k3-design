export type Service = {
  slug: string;
  icon: "drafting" | "hardhat" | "sofa" | "ruler" | "wrench" | "clipboard";
  title: string;
  short: string;
  description: string;
  bullets: string[];
  priceHint: string;
};

export const services: Service[] = [
  {
    slug: "thiet-ke-kien-truc",
    icon: "drafting",
    title: "Thiết kế kiến trúc",
    short: "Từ ý tưởng đến hồ sơ xin phép xây dựng hoàn chỉnh.",
    description:
      "Chúng tôi bắt đầu bằng việc lắng nghe cách gia đình anh chị thực sự sống trong ngôi nhà: ai thức dậy sớm nhất, bữa cơm diễn ra ở đâu, khoảng nào cần yên tĩnh. Phương án kiến trúc chỉ được đưa ra sau khi những điều đó đã rõ ràng.",
    bullets: [
      "Khảo sát hiện trạng và tư vấn phương án bố trí công năng",
      "Phối cảnh 3D nội – ngoại thất, chỉnh sửa đến khi ưng ý",
      "Hồ sơ kỹ thuật thi công đầy đủ: kiến trúc, kết cấu, M&E",
      "Hồ sơ xin phép xây dựng theo quy định địa phương",
    ],
    priceHint: "Từ 210.000 đ/m² sàn",
  },
  {
    slug: "thi-cong-tron-goi",
    icon: "hardhat",
    title: "Thi công trọn gói",
    short: "Một đầu mối chịu trách nhiệm từ móng đến ngày bàn giao.",
    description:
      "Gói trọn gói loại bỏ điều khiến chủ nhà mệt mỏi nhất: phải tự điều phối giữa nhà thiết kế, đội thi công và nhà cung cấp vật tư. K3 Design đứng ra làm một đầu mối duy nhất, chịu trách nhiệm cả tiến độ lẫn chất lượng.",
    bullets: [
      "Hợp đồng ghi rõ khối lượng, đơn giá và mốc thanh toán",
      "Bảng vật tư chi tiết theo thương hiệu, không ghi chung chung",
      "Giám sát trưởng bám công trình, báo cáo hình ảnh hằng tuần",
      "Cam kết tiến độ, có điều khoản phạt chậm trong hợp đồng",
    ],
    priceHint: "Từ 5.800.000 đ/m² sàn",
  },
  {
    slug: "thiet-ke-thi-cong-noi-that",
    icon: "sofa",
    title: "Thiết kế & thi công nội thất",
    short: "Đồng bộ vật liệu, ánh sáng và đồ rời trong cùng một ngôn ngữ.",
    description:
      "Nội thất không phải là bước trang trí sau cùng. Chúng tôi triển khai nội thất song song với kiến trúc để hệ điện, ánh sáng và kích thước đồ đạc khớp nhau ngay từ bản vẽ, tránh việc phải đục phá chỉnh sửa về sau.",
    bullets: [
      "Thiết kế nội thất theo phong cách và ngân sách đã thống nhất",
      "Sản xuất tại xưởng, kiểm soát chất lượng trước khi lắp đặt",
      "Tư vấn vật liệu bền với khí hậu nóng ẩm Việt Nam",
      "Bảo hành đồ gỗ công nghiệp 24 tháng",
    ],
    priceHint: "Từ 2.400.000 đ/m² sàn",
  },
  {
    slug: "cai-tao-sua-chua",
    icon: "wrench",
    title: "Cải tạo & sửa chữa",
    short: "Nâng cấp nhà cũ mà không phải dọn đi quá lâu.",
    description:
      "Cải tạo khó hơn xây mới vì phải làm việc với những gì đã có. Chúng tôi khảo sát kết cấu hiện trạng trước khi báo giá, để anh chị biết chính xác cái gì giữ được và cái gì buộc phải thay.",
    bullets: [
      "Kiểm định kết cấu và hệ thống điện nước hiện trạng",
      "Phương án cải tạo theo từng giai đoạn nếu cần ở lại",
      "Xử lý triệt để thấm dột, nứt tường, xuống cấp sàn",
      "Thi công gọn, che chắn và vệ sinh sau mỗi ngày làm việc",
    ],
    priceHint: "Báo giá theo khảo sát thực tế",
  },
  {
    slug: "giam-sat-quan-ly-du-an",
    icon: "clipboard",
    title: "Giám sát & quản lý dự án",
    short: "Dành cho chủ nhà đã có đội thi công riêng.",
    description:
      "Nếu anh chị đã có nhà thầu nhưng cần một bên độc lập kiểm tra chất lượng và khối lượng, chúng tôi nhận vai trò giám sát tác giả kiêm quản lý dự án, đứng về phía chủ đầu tư.",
    bullets: [
      "Nghiệm thu từng hạng mục theo tiêu chuẩn TCVN",
      "Kiểm tra khối lượng thanh toán trước khi chủ nhà giải ngân",
      "Báo cáo tiến độ và rủi ro định kỳ",
      "Kiểm soát biến động chi phí phát sinh",
    ],
    priceHint: "Từ 3% giá trị hợp đồng thi công",
  },
  {
    slug: "xin-phep-xay-dung",
    icon: "ruler",
    title: "Hồ sơ pháp lý xây dựng",
    short: "Lo phần thủ tục để anh chị tập trung vào ngôi nhà.",
    description:
      "Thủ tục xin phép xây dựng mỗi quận mỗi khác. Chúng tôi làm trọn gói phần hồ sơ, theo dõi tiến trình và xử lý các yêu cầu bổ sung từ cơ quan quản lý.",
    bullets: [
      "Lập hồ sơ xin phép xây dựng, cải tạo, sửa chữa",
      "Hoàn công và cập nhật tài sản trên giấy chứng nhận",
      "Tư vấn chỉ giới, mật độ và chiều cao được phép",
      "Đại diện làm việc với cơ quan cấp phép",
    ],
    priceHint: "Trọn gói theo quy mô công trình",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
