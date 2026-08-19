export type Service = {
  slug: string;
  icon:
    | "drafting"
    | "hardhat"
    | "sofa"
    | "ruler"
    | "wrench"
    | "clipboard"
    | "spray";
  title: string;
  short: string;
  /** Doan mo dau */
  description: string;
  /** Cac doan noi dung sau doan mo dau */
  detail: string[];
  /** "Anh chi nhan duoc gi" */
  bullets: string[];
  /** "Phu hop voi" */
  suitableFor: string[];
  /** "Khong bao gom" — ghi ro de tranh hieu nham ve sau */
  notIncluded: string[];
  /** Thoi gian thuc hien du kien */
  duration: string;
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
    detail: [
      "Buổi làm việc đầu tiên không bàn về hình khối hay phong cách. Chúng tôi hỏi về nếp sinh hoạt: nhà có mấy người, ai ở tầng nào, khách tới thường ngồi đâu, có ai làm việc tại nhà không, xe cộ để ra sao. Mặt bằng công năng được vẽ từ những câu trả lời đó, rồi hình khối mới hình thành theo mặt bằng.",
      "Phương án được chỉnh sửa cho đến khi anh chị thực sự ưng, không giới hạn số lần trong giai đoạn phương án. Chỉ khi mặt bằng và phối cảnh đã chốt, chúng tôi mới triển khai hồ sơ kỹ thuật — vì đây là giai đoạn tốn công nhất, sửa ở bước này rất mất thời gian cho cả hai bên.",
      "Hồ sơ bàn giao đủ để bất kỳ nhà thầu nào cũng thi công được, không phụ thuộc vào việc anh chị có chọn K3 thi công hay không.",
    ],
    suitableFor: [
      "Nhà phố, biệt thự, nhà vườn xây mới",
      "Công trình cần hồ sơ để xin phép xây dựng",
      "Chủ nhà đã có đội thi công riêng, chỉ cần bản vẽ",
      "Cải tạo lớn cần vẽ lại toàn bộ mặt bằng",
    ],
    notIncluded: [
      "Chi phí triển khai kết cấu và MEP (báo riêng)",
      "Chi phí thi công",
      "Nội thất rời và trang trí",
      "Lệ phí và thủ tục xin phép xây dựng",
    ],
    duration: "25 – 45 ngày tùy quy mô",
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
    // Khao sat thi truong TP.HCM 8/2026: goi co ban 6,0-6,5tr; goi kha 7,0-7,5tr;
    // goi cao cap 10-12tr d/m2 san. Lay muc vao cua goi co ban.
    detail: [
      "Trọn gói nghĩa là anh chị làm việc với một đầu mối duy nhất từ lúc đào móng đến ngày nhận chìa khóa. Không phải tự điều phối giữa đội thợ, nhà cung cấp vật tư và đơn vị thiết kế, cũng không phải nghe ba bên đổ lỗi cho nhau khi có vấn đề.",
      "Mỗi tuần anh chị nhận một báo cáo gồm ảnh chụp hiện trạng, khối lượng đã làm và kế hoạch tuần tới. Ở các mốc quan trọng — đổ bê tông móng, đổ sàn từng tầng, trước khi tô che hệ điện nước, nghiệm thu chống thấm — anh chị được mời ra công trường cùng kiểm tra và ký biên bản.",
      "Mọi thay đổi về khối lượng hay vật tư đều phải có phiếu xác nhận anh chị ký trước khi thực hiện. Không có phát sinh nào được làm rồi mới báo.",
    ],
    suitableFor: [
      "Chủ nhà bận, không có thời gian ra công trường thường xuyên",
      "Người ở xa công trình hoặc ở nước ngoài",
      "Ai muốn biết trước tổng chi phí thay vì trả theo từng đợt phát sinh",
      "Công trình đã có hồ sơ thiết kế hoàn chỉnh",
    ],
    notIncluded: [
      "Nội thất rời: sofa, bàn ghế, rèm, đồ trang trí",
      "Thiết bị điện tử: tivi, máy lạnh, tủ lạnh",
      "Cây xanh và cảnh quan sân vườn",
      "Chi phí pháp lý: xin phép, hoàn công",
    ],
    duration: "6 – 9 tháng cho nhà phố 3 – 4 tầng",
    priceHint: "Từ 6.000.000 đ/m² sàn",
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
    detail: [
      "Nội thất không phải bước trang trí làm sau cùng. Nếu chờ xây xong mới tính nội thất, anh chị sẽ gặp cảnh ổ điện nằm sau lưng tủ, đèn không đúng vị trí bàn ăn, hoặc tủ bếp hụt vài centimet so với khoảng tường. Sửa những lỗi này đồng nghĩa với đục tường.",
      "Vì vậy chúng tôi triển khai nội thất song song với kiến trúc, để hệ điện, ánh sáng và kích thước đồ đạc khớp nhau ngay từ bản vẽ.",
      "Đồ gỗ được sản xuất tại xưởng và kiểm tra trước khi chở tới công trình, nên thời gian lắp đặt tại nhà ngắn và ít bụi bẩn hơn so với đóng tại chỗ.",
    ],
    suitableFor: [
      "Căn hộ chung cư nhận bàn giao thô hoặc cơ bản",
      "Nhà phố, biệt thự đang trong giai đoạn hoàn thiện",
      "Mặt bằng kinh doanh ăn uống, cà phê (FnB)",
      "Nhà cũ muốn thay toàn bộ nội thất mà không đụng kết cấu",
    ],
    notIncluded: [
      "Thiết bị điện tử và gia dụng",
      "Rèm cửa, thảm, tranh và đồ trang trí nhỏ",
      "Cải tạo kết cấu hoặc thay đổi hệ tường",
      "Chi phí thi công phần thô nếu công trình chưa hoàn thiện",
    ],
    duration: "45 – 90 ngày tùy khối lượng đồ gỗ",
    priceHint: "Thiết kế từ 160.000 đ/m² sàn",
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
    // Khao sat thi truong TP.HCM 8/2026: cai tao nha pho pho bien 3-5tr d/m2;
    // rieng hang muc cai tao co ban 2,55-3,55tr. Lay muc vao 3tr.
    detail: [
      "Cải tạo khó hơn xây mới, vì phải làm việc với những gì đã có và thường chỉ phát hiện vấn đề khi đã đục ra. Do đó chúng tôi luôn khảo sát kết cấu và hệ điện nước hiện trạng trước khi báo giá, thay vì đưa một con số rồi điều chỉnh liên tục về sau.",
      "Kết quả khảo sát cho biết phần nào giữ được và phần nào buộc phải thay. Nhiều trường hợp khung bê tông vẫn tốt, chỉ cần thay hệ bao che và đi lại điện nước — chi phí khi đó thấp hơn nhiều so với đập đi xây lại.",
      "Nếu gia đình vẫn ở trong nhà khi thi công, chúng tôi chia công trình thành từng giai đoạn theo khu vực, che chắn kín và vệ sinh sau mỗi ngày làm việc.",
    ],
    suitableFor: [
      "Nhà trên 10 năm bị thấm dột, nứt tường, xuống cấp",
      "Nhà cần thêm phòng hoặc đổi công năng sử dụng",
      "Nhà mới mua lại, muốn làm mới trước khi dọn vào",
      "Mặt bằng thuê cần sửa lại theo nhu cầu kinh doanh",
    ],
    notIncluded: [
      "Chi phí xử lý phần kết cấu hư hỏng nặng phát hiện sau khi đục",
      "Nội thất rời và thiết bị điện tử",
      "Chi phí xin phép sửa chữa nếu có thay đổi kết cấu",
      "Chi phí lưu trú tạm nếu gia đình phải dọn ra ngoài",
    ],
    duration: "2 – 6 tháng tùy mức độ can thiệp",
    priceHint: "Từ 3.000.000 đ/m² sàn",
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
    // Dinh muc theo Thong tu 12/2021/TT-BXD: chi phi giam sat thi cong tinh
    // bang 2-3,5% chi phi xay dung chua VAT trong du toan goi thau.
    detail: [
      "Dịch vụ này dành cho chủ nhà đã có nhà thầu nhưng muốn một bên độc lập đứng về phía mình. Chúng tôi không thi công công trình đó, nên không có lý do gì để bỏ qua lỗi.",
      "Công việc gồm hai phần. Phần kỹ thuật: nghiệm thu từng hạng mục theo tiêu chuẩn, kiểm tra vật tư đầu vào có đúng chủng loại trong hợp đồng hay không. Phần khối lượng: rà soát bảng thanh toán từng đợt trước khi anh chị chuyển tiền, tránh trả cho phần chưa làm hoặc làm chưa đạt.",
      "Anh chị nhận báo cáo định kỳ kèm ảnh, trong đó nêu rõ những điểm chưa đạt và đã yêu cầu nhà thầu khắc phục ra sao.",
    ],
    suitableFor: [
      "Chủ nhà đã chọn được nhà thầu nhưng chưa yên tâm về chất lượng",
      "Người ở xa, không ra công trường thường xuyên được",
      "Công trình có giá trị lớn cần kiểm soát khối lượng thanh toán",
      "Chủ đầu tư muốn có hồ sơ nghiệm thu đầy đủ để làm căn cứ bảo hành",
    ],
    notIncluded: [
      "Chi phí thi công và vật tư",
      "Trách nhiệm thay nhà thầu thực hiện công việc",
      "Chi phí kiểm định độc lập nếu cần thuê phòng thí nghiệm",
      "Thiết kế và điều chỉnh bản vẽ",
    ],
    duration: "Theo thời gian hợp đồng thi công",
    priceHint: "2 – 3,5% giá trị hợp đồng thi công",
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
    // Khao sat thi truong TP.HCM 8/2026: dich vu xin phep tron goi 5-15tr/ho so.
    // Le phi nha nuoc cap phep nha o rieng le tai TP.HCM: 75.000 d.
    detail: [
      "Từ đầu năm 2026, hồ sơ xin phép xây dựng nhà ở riêng lẻ tại TP.HCM nộp tại Bộ phận Một cửa của UBND phường, xã nơi có đất — không còn nộp lên quận, huyện như trước. Đây là chỗ nhiều chủ nhà vẫn đi nhầm và mất thêm thời gian.",
      "Chúng tôi lập bộ hồ sơ, nộp, theo dõi tiến trình và xử lý các yêu cầu bổ sung thay anh chị. Trước khi vẽ, chúng tôi tra cứu quy hoạch khu vực để biết mật độ xây dựng, khoảng lùi và chiều cao được phép — tránh trường hợp vẽ xong phương án ưng ý rồi mới phát hiện không xin phép được.",
      "Thời hạn giải quyết theo quy định là 15 ngày kể từ khi hồ sơ được xác nhận đầy đủ. Chúng tôi cũng nhận phần hoàn công và cập nhật tài sản lên giấy chứng nhận sau khi công trình xong.",
    ],
    suitableFor: [
      "Chủ nhà chuẩn bị khởi công, chưa có giấy phép",
      "Công trình cải tạo có thay đổi kết cấu hoặc diện tích",
      "Nhà đã xây xong cần làm hoàn công",
      "Người không có thời gian đi lại làm thủ tục",
    ],
    notIncluded: [
      "Lệ phí nhà nước, nộp theo mức thực tế (75.000 đ tại TP.HCM)",
      "Chi phí đo đạc, tách thửa hoặc cập nhật biến động đất đai",
      "Xử lý tranh chấp đất đai hoặc vi phạm xây dựng có từ trước",
      "Chi phí thiết kế kiến trúc nếu chưa có hồ sơ",
    ],
    duration: "15 ngày xử lý, cộng thời gian lập hồ sơ",
    priceHint: "Từ 5.000.000 đ/hồ sơ",
  },
  {
    slug: "ve-sinh-cong-nghiep",
    icon: "spray",
    title: "Vệ sinh công nghiệp",
    short:
      "Làm sạch sau thi công và vệ sinh định kỳ cho công trình đã sử dụng.",
    description:
      "Công trình vừa xây xong vẫn còn vữa, keo silicon và vết sơn bám chặt trên sàn và kính — chổi với nước lau nhà thông thường không xử lý được. Chúng tôi làm sạch bằng máy chà sàn công nghiệp, và với phần kính trên cao thì dùng dây chuyên dụng để tiếp cận từ bên ngoài.",
    bullets: [
      "Vệ sinh sau xây dựng: bóc keo, tẩy vữa, xi măng và sơn bám trên bề mặt",
      "Chà sàn bằng máy công nghiệp, đánh bóng đá granite và sàn bê tông mài",
      "Vệ sinh kính nhà cao tầng cả mặt trong lẫn mặt ngoài",
      "Thi công trên cao bằng dây chuyên dụng, tuân thủ quy trình an toàn lao động",
      "Nhận vệ sinh định kỳ theo tháng hoặc quý cho văn phòng, showroom, nhà xưởng",
    ],
    detail: [
      "Chất bẩn sau xây dựng khác hẳn bụi bẩn sinh hoạt. Vữa xi măng, keo silicon và sơn đã đóng rắn liên kết với bề mặt, nước lau nhà thông thường không xử lý được. Chà mạnh bằng dụng cụ sai còn để lại vết xước vĩnh viễn trên men gạch và kính.",
      "Chúng tôi dùng hóa chất phù hợp cho từng loại bề mặt — riêng khu vực dùng đá tự nhiên phải tránh hóa chất gốc axit — kết hợp máy chà sàn công nghiệp để bề mặt sạch đều thay vì loang lổ.",
      "Phần kính trên 4 mét không tiếp cận an toàn bằng thang, phải thi công bằng dây chuyên dụng. Đây là lý do đơn giá vệ sinh kính phân theo độ cao.",
    ],
    suitableFor: [
      "Công trình vừa hoàn thiện, chuẩn bị bàn giao hoặc dọn vào",
      "Văn phòng, showroom, nhà xưởng cần vệ sinh định kỳ",
      "Nhà cao tầng cần vệ sinh kính mặt ngoài",
      "Mặt bằng kinh doanh làm mới trước khi khai trương",
    ],
    notIncluded: [
      "Sửa chữa hư hỏng có sẵn trên bề mặt",
      "Đánh bóng phục hồi đá tự nhiên bị xuống cấp nặng",
      "Vận chuyển và xử lý phế thải xây dựng khối lượng lớn",
      "Vệ sinh hệ thống điều hòa và ống thông gió",
    ],
    duration: "1 – 5 ngày tùy diện tích",
    priceHint: "Từ 10.000 đ/m²",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
