/** Cac khoi noi dung dung chung nhieu trang. [SUA] tu do theo thuc te cong ty. */

export type ProcessStep = {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Tiếp nhận & khảo sát",
    duration: "3 – 5 ngày",
    description:
      "Chúng tôi đến tận công trình đo đạc hiện trạng, ghi nhận hướng nắng, hướng gió và các ràng buộc của khu đất. Song song đó là buổi trao đổi để hiểu nhu cầu sinh hoạt thực tế của gia đình.",
    deliverables: [
      "Biên bản khảo sát hiện trạng",
      "Bảng nhu cầu sử dụng đã thống nhất",
      "Khung ngân sách sơ bộ",
    ],
  },
  {
    step: "02",
    title: "Phương án thiết kế",
    duration: "10 – 20 ngày",
    description:
      "Từ dữ liệu khảo sát, chúng tôi đưa ra phương án mặt bằng công năng và hình khối kiến trúc. Anh chị góp ý cho đến khi phương án phản ánh đúng cách gia đình muốn sống.",
    deliverables: [
      "Mặt bằng bố trí công năng các tầng",
      "Phối cảnh 3D ngoại thất và các không gian chính",
      "Bảng khái toán chi phí theo phương án",
    ],
  },
  {
    step: "03",
    title: "Hồ sơ kỹ thuật & pháp lý",
    duration: "15 – 25 ngày",
    description:
      "Phương án được duyệt sẽ triển khai thành hồ sơ thi công đầy đủ gồm kiến trúc, kết cấu và hệ thống điện nước. Chúng tôi đồng thời hoàn thiện hồ sơ xin phép xây dựng.",
    deliverables: [
      "Hồ sơ kỹ thuật thi công đầy đủ ba bộ môn",
      "Hồ sơ xin phép xây dựng",
      "Bảng dự toán chi tiết theo khối lượng",
    ],
  },
  {
    step: "04",
    title: "Ký hợp đồng thi công",
    duration: "2 – 3 ngày",
    description:
      "Hợp đồng ghi rõ khối lượng, đơn giá từng hạng mục, bảng vật tư theo thương hiệu, mốc tiến độ và các mốc thanh toán. Không có hạng mục nào để mở.",
    deliverables: [
      "Hợp đồng thi công và phụ lục vật tư",
      "Tiến độ chi tiết theo tuần",
      "Lịch thanh toán theo giai đoạn nghiệm thu",
    ],
  },
  {
    step: "05",
    title: "Thi công & giám sát",
    duration: "Theo quy mô công trình",
    description:
      "Giám sát trưởng bám công trình toàn thời gian. Anh chị nhận báo cáo hình ảnh và khối lượng hằng tuần, và được mời nghiệm thu tại các mốc quan trọng như đổ sàn, xây tô, hoàn thiện.",
    deliverables: [
      "Báo cáo tiến độ và hình ảnh hằng tuần",
      "Biên bản nghiệm thu từng giai đoạn",
      "Nhật ký công trình đầy đủ",
    ],
  },
  {
    step: "06",
    title: "Bàn giao & bảo hành",
    duration: "5 – 7 ngày",
    description:
      "Chúng tôi cùng anh chị đi kiểm tra toàn bộ công trình, lập danh sách các điểm cần chỉnh và xử lý dứt điểm trước khi bàn giao chìa khóa. Hồ sơ hoàn công được nộp ngay sau đó.",
    deliverables: [
      "Biên bản bàn giao và danh mục thiết bị",
      "Hồ sơ hoàn công",
      "Phiếu bảo hành theo từng nhóm hạng mục",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Điều tôi đánh giá cao nhất là bảng vật tư ghi rõ thương hiệu ngay từ hợp đồng. Suốt tám tháng thi công không có khoản nào ngoài dự tính lớn, quyết toán chỉ chênh khoảng hai phần trăm.",
    name: "Anh Hưng",
    role: "Chủ nhà",
    project: "Nhà phố Thảo Điền",
  },
  {
    quote:
      "Nhà tôi ở khu đất trũng, trước khi làm tôi lo nhất chuyện ngập. Đội K3 xử lý nền và làm hồ điều tiết, qua hai mùa mưa vẫn khô ráo. Buổi trưa trong nhà mát hơn hẳn bên ngoài.",
    name: "Chị Mai",
    role: "Chủ đầu tư",
    project: "Biệt thự vườn Long An",
  },
  {
    quote:
      "Chúng tôi cần bàn giao trước kỳ chuyển văn phòng và họ làm đúng cam kết. Việc phân vùng theo mức độ ồn hiệu quả hơn tôi tưởng, bộ phận kỹ thuật không còn phàn nàn.",
    name: "Anh Phong",
    role: "Giám đốc điều hành",
    project: "Văn phòng 600 m² Tân Bình",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Chi phí thiết kế và thi công được tính như thế nào?",
    answer:
      "Phí thiết kế tính theo mét vuông sàn xây dựng, phụ thuộc vào quy mô và mức độ phức tạp. Chi phí thi công tính theo đơn giá trọn gói trên mét vuông, đã bao gồm nhân công, vật tư và thiết bị theo bảng vật tư đính kèm hợp đồng. Nếu anh chị dùng cả hai dịch vụ, phí thiết kế được khấu trừ một phần vào giá trị hợp đồng thi công.",
  },
  {
    question: "Nếu tôi chỉ cần thiết kế, không cần thi công thì có được không?",
    answer:
      "Được. Nhiều khách hàng chỉ dùng dịch vụ thiết kế và tự tổ chức thi công. Chúng tôi bàn giao đầy đủ hồ sơ kỹ thuật ba bộ môn để bất kỳ nhà thầu nào cũng triển khai được, và có thể nhận thêm phần giám sát tác giả nếu anh chị muốn.",
  },
  {
    question: "Thời gian hoàn thành một căn nhà phố thường là bao lâu?",
    answer:
      "Với nhà phố 3 – 4 tầng quy mô khoảng 300 – 450 m² sàn, giai đoạn thiết kế và pháp lý mất khoảng 1,5 – 2 tháng, thi công khoảng 6 – 9 tháng tùy mức độ hoàn thiện. Mốc tiến độ cụ thể được ghi trong hợp đồng kèm điều khoản xử lý khi chậm.",
  },
  {
    question: "Công ty có nhận công trình ở tỉnh không?",
    answer:
      "Có. Chúng tôi đã thực hiện các công trình tại Long An, Bình Dương, Đồng Nai và một số tỉnh lân cận. Với công trình ngoài phạm vi 100 km, chi phí di chuyển và lưu trú của đội giám sát sẽ được thể hiện riêng trong báo giá.",
  },
  {
    question: "Chính sách bảo hành ra sao?",
    answer:
      "Kết cấu chính bảo hành 60 tháng, chống thấm 24 tháng, hệ điện nước 24 tháng, đồ gỗ công nghiệp 24 tháng. Thiết bị lắp đặt theo chính sách bảo hành của hãng. Toàn bộ được ghi trong phiếu bảo hành bàn giao cùng công trình.",
  },
  {
    question: "Tôi có thể theo dõi tiến độ khi không ở gần công trình không?",
    answer:
      "Có. Anh chị nhận báo cáo hình ảnh và khối lượng hằng tuần, và được mời tham gia nghiệm thu tại các mốc quan trọng. Với khách ở xa, chúng tôi sắp xếp gọi video trực tiếp tại công trình vào các buổi nghiệm thu.",
  },
];

export const values = [
  {
    title: "Minh bạch chi phí",
    description:
      "Bảng vật tư ghi rõ thương hiệu và mã sản phẩm ngay trong hợp đồng. Mọi phát sinh phải được duyệt bằng văn bản trước khi thực hiện.",
  },
  {
    title: "Một đầu mối chịu trách nhiệm",
    description:
      "Anh chị làm việc với một người phụ trách duy nhất từ đầu đến cuối, thay vì phải tự điều phối giữa thiết kế, thi công và cung ứng.",
  },
  {
    title: "Thiết kế bám nhu cầu thật",
    description:
      "Phương án chỉ được đưa ra sau khi hiểu rõ cách gia đình sinh hoạt, thay vì áp một mẫu nhà có sẵn lên khu đất.",
  },
  {
    title: "Bàn giao là bắt đầu, không phải kết thúc",
    description:
      "Chúng tôi giữ liên hệ sau bàn giao và xử lý bảo hành trong vòng 48 giờ kể từ khi nhận thông báo.",
  },
];
