export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  category: string;
  readingTime: string;
  cover: string;
  /** Noi dung dang doan van. Moi phan tu la 1 doan hoac 1 tieu de dang "## ..." */
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "chi-phi-xay-nha-2026",
    title: "Chi phí xây nhà năm 2026: bóc tách từng khoản để không bị đội giá",
    excerpt:
      "Phần lớn trường hợp đội giá không đến từ vật tư tăng, mà đến từ những hạng mục không được ghi rõ trong hợp đồng ban đầu.",
    date: "2026-07-28",
    category: "Kinh nghiệm",
    readingTime: "7 phút đọc",
    cover: "/images/news/chi-phi-xay-nha.svg",
    body: [
      "Câu hỏi đầu tiên gần như mọi chủ nhà đều hỏi là xây một căn nhà hết bao nhiêu tiền. Câu trả lời trung thực là con số đơn giá trên mét vuông chỉ có ý nghĩa khi anh chị biết nó bao gồm những gì.",
      "## Đơn giá trọn gói thực sự bao gồm những gì",
      "Một đơn giá thi công trọn gói thường gồm ba nhóm: phần thô và nhân công hoàn thiện, vật tư hoàn thiện, và thiết bị. Nhóm thứ ba là nơi chênh lệch lớn nhất giữa các báo giá, vì cùng một chữ thiết bị vệ sinh có thể là hàng phổ thông hoặc hàng nhập khẩu, chênh nhau nhiều lần.",
      "Khi nhận báo giá, anh chị nên yêu cầu bảng vật tư ghi rõ thương hiệu và mã sản phẩm cho từng hạng mục. Một bảng vật tư chỉ ghi gạch cao cấp hay sơn loại tốt là dấu hiệu cho thấy phần chi phí đó chưa được xác định.",
      "## Những khoản thường bị bỏ quên",
      "Chi phí ép cọc và xử lý nền phụ thuộc vào kết quả khảo sát địa chất, nên hầu như không thể chốt trước khi khoan. Tương tự là chi phí phá dỡ công trình cũ, di dời hạ tầng và chi phí thuê vỉa hè trong quá trình thi công ở khu vực nội thành.",
      "Nhóm thứ hai hay bị quên là chi phí pháp lý: xin phép xây dựng, hoàn công và cập nhật tài sản lên giấy chứng nhận. Khoản này không lớn nhưng nếu không tính trước sẽ làm lệch kế hoạch dòng tiền ở giai đoạn cuối.",
      "## Cách kiểm soát ngân sách trong thực tế",
      "Kinh nghiệm của chúng tôi là dành sẵn khoảng 10% tổng ngân sách làm dự phòng và không đụng vào cho đến khi kết thúc phần thô. Phần lớn phát sinh xuất hiện ở giai đoạn hoàn thiện, khi chủ nhà nhìn thấy không gian thật và muốn thay đổi so với bản vẽ.",
      "Điều quan trọng nhất vẫn là hợp đồng: khối lượng, đơn giá, mốc thanh toán và điều khoản xử lý phát sinh cần được ghi rõ trước khi khởi công. Một hợp đồng chi tiết bảo vệ cả hai phía.",
    ],
  },
  {
    slug: "chong-tham-nha-o-viet-nam",
    title: "Chống thấm cho nhà ở tại Việt Nam: làm đúng ngay từ đầu",
    excerpt:
      "Thấm là lỗi phổ biến nhất trong các công trình nhà ở, và cũng là lỗi tốn kém nhất khi phải sửa lại sau khi đã hoàn thiện.",
    date: "2026-06-15",
    category: "Kỹ thuật",
    readingTime: "6 phút đọc",
    cover: "/images/news/chong-tham.svg",
    body: [
      "Khí hậu nóng ẩm và mùa mưa kéo dài khiến chống thấm trở thành hạng mục quyết định tuổi thọ công trình. Chi phí chống thấm đúng cách chỉ chiếm một phần nhỏ tổng giá trị xây dựng, nhưng chi phí xử lý thấm sau khi nhà đã hoàn thiện thì cao hơn nhiều lần.",
      "## Bốn vị trí cần chú ý nhất",
      "Sân thượng và mái là nơi chịu tác động trực tiếp của nắng mưa và giãn nở nhiệt. Nhà vệ sinh có nguy cơ thấm xuống trần tầng dưới nếu lớp chống thấm sàn không được thi công liên tục lên chân tường. Tường tiếp giáp nhà bên là vị trí khó xử lý nhất vì không thể tiếp cận từ mặt ngoài. Cuối cùng là chân tường tiếp đất, nơi nước ngầm đi lên theo mao dẫn.",
      "## Nguyên tắc thi công",
      "Lớp chống thấm chỉ hiệu quả khi bề mặt nền được xử lý sạch, khô và phẳng trước khi thi công. Bỏ qua bước này là nguyên nhân của phần lớn trường hợp bong tróc sau vài mùa mưa.",
      "Nguyên tắc thứ hai là chống thấm phải liên tục, không được đứt đoạn tại các vị trí giao nhau giữa sàn và tường, hay tại chỗ xuyên ống. Những điểm này cần được xử lý bằng vật liệu chuyên dụng trước khi phủ lớp chống thấm chính.",
      "## Nghiệm thu bằng cách ngâm nước",
      "Trước khi lát gạch, hãy yêu cầu ngâm thử nước ít nhất 24 giờ đối với sàn nhà vệ sinh và sân thượng, sau đó kiểm tra trần tầng dưới. Đây là bước nghiệm thu đơn giản nhưng bị bỏ qua rất thường xuyên, và nó là cơ hội cuối cùng để phát hiện lỗi trước khi mọi thứ bị che phủ.",
    ],
  },
  {
    slug: "chon-nha-thau-xay-dung",
    title: "Bảy câu hỏi nên đặt ra trước khi ký hợp đồng với nhà thầu",
    excerpt:
      "Một buổi trao đổi kỹ trước khi ký giúp tránh phần lớn tranh chấp có thể xảy ra trong suốt quá trình thi công.",
    date: "2026-05-09",
    category: "Kinh nghiệm",
    readingTime: "5 phút đọc",
    cover: "/images/news/chon-nha-thau.svg",
    body: [
      "Chọn nhà thầu là quyết định ảnh hưởng đến toàn bộ trải nghiệm xây nhà. Dưới đây là những câu hỏi chúng tôi khuyên chủ nhà nên đặt ra, kể cả khi đang làm việc với đơn vị khác.",
      "## Về năng lực",
      "Thứ nhất, đề nghị được xem ba công trình đã hoàn thành có quy mô tương tự và xin liên hệ của chủ nhà để hỏi trực tiếp. Thứ hai, hỏi ai sẽ là giám sát trưởng bám công trình và người đó đang phụ trách đồng thời bao nhiêu dự án.",
      "## Về hợp đồng",
      "Thứ ba, yêu cầu bảng vật tư ghi rõ thương hiệu và mã sản phẩm. Thứ tư, hỏi cơ chế xử lý phát sinh: phát sinh được duyệt bằng văn bản hay chỉ trao đổi miệng. Thứ năm, kiểm tra điều khoản tiến độ có ràng buộc trách nhiệm khi chậm hay không.",
      "## Về vận hành",
      "Thứ sáu, hỏi tần suất báo cáo và hình thức báo cáo. Một đơn vị chuyên nghiệp sẽ có quy trình gửi hình ảnh và khối lượng định kỳ mà chủ nhà không cần phải hỏi. Thứ bảy, làm rõ phạm vi và thời hạn bảo hành cho từng nhóm hạng mục, vì bảo hành phần thô và bảo hành thiết bị thường khác nhau.",
      "Nếu một nhà thầu trả lời được đầy đủ bảy câu hỏi này bằng tài liệu cụ thể chứ không phải lời hứa, đó là dấu hiệu tốt để tiếp tục.",
    ],
  },
  {
    slug: "toi-uu-thong-gio-nha-ong",
    title: "Thông gió tự nhiên cho nhà ống: giải pháp cho lô đất hẹp",
    excerpt:
      "Nhà ống bị kẹp hai bên vẫn có thể thông thoáng nếu tổ chức được luồng khí đi xuyên qua công trình.",
    date: "2026-03-22",
    category: "Thiết kế",
    readingTime: "6 phút đọc",
    cover: "/images/news/thong-gio.svg",
    body: [
      "Đặc điểm của nhà ống tại các đô thị Việt Nam là mặt tiền hẹp, chiều sâu lớn và bị che chắn hai bên. Kết quả thường thấy là khu vực giữa nhà tối và bí, phải dùng đèn và máy lạnh gần như cả ngày.",
      "## Nguyên lý cơ bản",
      "Không khí chỉ chuyển động khi có chênh lệch áp suất. Vì vậy một ô cửa sổ đơn lẻ hầu như không tạo ra thông gió; cần ít nhất hai khe hở ở hai cao độ hoặc hai vị trí khác nhau để hình thành dòng chảy.",
      "## Giếng trời và hiệu ứng ống khói",
      "Giếng trời là công cụ hiệu quả nhất cho nhà ống. Không khí nóng nhẹ hơn sẽ bốc lên và thoát ra ở đỉnh giếng, kéo theo không khí mát từ mặt tiền hoặc sân sau đi vào. Để hiệu ứng này hoạt động, đỉnh giếng trời cần có khe thoát khí, không nên đóng kín hoàn toàn bằng kính.",
      "Vị trí giếng trời nên đặt lệch về phía sau hoặc giữa nhà thay vì ngay giữa mặt bằng, để vừa lấy sáng cho khu vực sâu nhất vừa không làm mất diện tích sử dụng ở vị trí đẹp.",
      "## Những lưu ý khi thi công",
      "Giếng trời cần có phương án che mưa tạt và thoát nước sàn đầy đủ. Nên bố trí lưới chắn côn trùng ở khe thoát khí và tính trước phương án vệ sinh kính ở độ cao lớn. Nếu nhà có trẻ nhỏ, lan can quanh giếng trời phải đạt chiều cao an toàn và không có thanh ngang để trèo.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const sortedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date)
);
