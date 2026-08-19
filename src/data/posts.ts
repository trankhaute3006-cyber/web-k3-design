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
  {
    slug: "xin-giay-phep-xay-dung-tphcm",
    title: "Xin giấy phép xây dựng nhà ở tại TP.HCM: nộp ở đâu, cần gì, bao lâu",
    excerpt:
      "Từ đầu năm 2026, hồ sơ nộp tại phường xã chứ không còn lên quận. Nhiều chủ nhà vẫn mang hồ sơ đi sai chỗ và mất thêm cả tuần.",
    date: "2026-08-12",
    category: "Pháp lý",
    readingTime: "6 phút đọc",
    cover: "/images/news/giay-phep-xay-dung.svg",
    body: [
      "Xin giấy phép là bước khiến nhiều chủ nhà mất thời gian nhất, không phải vì thủ tục phức tạp mà vì chuẩn bị thiếu rồi phải bổ sung nhiều lần. Bài này liệt kê đúng những gì cần có.",
      "## Nộp ở đâu",
      "Từ ngày 1/1/2026, tại TP.HCM người dân nộp hồ sơ xin giấy phép xây dựng nhà ở riêng lẻ ngay tại Bộ phận Một cửa của UBND phường, xã nơi có đất — thay vì lên UBND quận, huyện như trước. Đây là thay đổi sau khi bộ máy hành chính được sắp xếp lại, và cũng là chỗ nhiều người còn nhầm.",
      "Anh chị cũng có thể nộp trực tuyến qua Cổng dịch vụ công quốc gia hoặc Cổng dịch vụ công thành phố. Cách này tiện khi hồ sơ đã đầy đủ, nhưng nếu chưa chắc chắn thì nộp trực tiếp vẫn hơn, vì cán bộ tiếp nhận sẽ soát sơ bộ và chỉ ra ngay chỗ thiếu.",
      "## Hồ sơ gồm ba nhóm",
      "Theo Điều 46 Nghị định 15/2021/NĐ-CP, hồ sơ đề nghị cấp giấy phép xây dựng nhà ở riêng lẻ gồm: đơn đề nghị theo Mẫu số 01; giấy tờ chứng minh quyền sử dụng đất; và hai bộ bản vẽ thiết kế xây dựng.",
      "Giấy tờ đất thường là Giấy chứng nhận quyền sử dụng đất. Trường hợp đất thuê hoặc được giao thì dùng hợp đồng thuê đất, quyết định giao đất theo Luật Đất đai 2024.",
      "Phần hay vướng nhất là bộ bản vẽ. Bản vẽ phải do đơn vị có đủ năng lực lập, thể hiện đúng mật độ xây dựng, khoảng lùi và chiều cao được phép của khu vực. Bản vẽ tự vẽ hoặc sao chép từ nhà hàng xóm gần như chắc chắn bị trả lại.",
      "## Mất bao lâu",
      "Thời hạn giải quyết với nhà ở riêng lẻ tại đô thị là 15 ngày kể từ ngày nhận đủ hồ sơ hợp lệ. Nếu cần xem xét thêm, cơ quan cấp phép phải thông báo bằng văn bản nêu rõ lý do, và thời gian kéo dài không quá 10 ngày kể từ ngày hết hạn.",
      "Cụm từ đáng chú ý là “nhận đủ hồ sơ hợp lệ”. Ngày bắt đầu tính không phải ngày anh chị nộp lần đầu, mà là ngày hồ sơ được xác nhận đầy đủ. Thiếu một giấy tờ là đồng hồ chưa chạy.",
      "## Lệ phí",
      "Lệ phí cấp giấy phép xây dựng nhà ở riêng lẻ tại TP.HCM là 75.000 đồng. Con số này rất nhỏ so với tổng chi phí, nên nếu ai báo giá dịch vụ vài triệu thì phần lớn là công lập bản vẽ và công đi lại làm thủ tục, không phải lệ phí nhà nước.",
      "## Ba lỗi khiến hồ sơ bị trả",
      "Thứ nhất, bản vẽ không khớp hiện trạng đất — ranh đất trên bản vẽ khác với ranh trên giấy chứng nhận. Thứ hai, vượt mật độ xây dựng hoặc chiều cao cho phép của khu vực, thường gặp ở nhà muốn xây sát ranh hoặc thêm tầng lửng không khai báo. Thứ ba, đất đang có tranh chấp hoặc chưa hoàn tất cập nhật biến động sau khi mua bán.",
      "Cả ba lỗi này đều phát hiện được từ khâu khảo sát, trước khi vẽ. Đó là lý do chúng tôi luôn kiểm tra giấy tờ đất và tra cứu quy hoạch khu vực trước khi đưa ra phương án kiến trúc, thay vì vẽ xong đẹp rồi mới biết không xin phép được.",
    ],
  },
  {
    slug: "doc-bang-vat-tu-hop-dong",
    title: "Đọc bảng vật tư trong hợp đồng: sáu chỗ dễ bị đánh tráo nhất",
    excerpt:
      "Hai bản hợp đồng cùng đơn giá một mét vuông vẫn có thể chênh nhau hàng trăm triệu, và toàn bộ khác biệt nằm ở bảng vật tư.",
    date: "2026-08-02",
    category: "Kinh nghiệm",
    readingTime: "7 phút đọc",
    cover: "/images/news/bang-vat-tu.svg",
    body: [
      "Khi so sánh báo giá giữa các nhà thầu, phần lớn chủ nhà nhìn vào con số đơn giá trên mét vuông. Nhưng đơn giá chỉ là kết quả; thứ quyết định nó là bảng vật tư đính kèm. Dưới đây là sáu vị trí mà cách ghi mập mờ có thể làm chênh lệch rất lớn.",
      "## 1. Xi măng và thép không ghi mác",
      "Bảng vật tư ghi “xi măng chất lượng cao” hoặc “thép Việt Nam” là chưa đủ. Cần ghi rõ tên nhà sản xuất và mác thép, ví dụ thép CB300-V hay CB400-V. Hai loại này khác nhau về giới hạn chảy, và giá cũng khác nhau.",
      "## 2. Gạch xây không ghi kích thước và chủng loại",
      "Gạch ống bốn lỗ, sáu lỗ, gạch không nung hay gạch đặc có giá và khả năng cách nhiệt khác hẳn nhau. Ghi chung là “gạch xây” thì lúc thi công dùng loại nào cũng đúng hợp đồng.",
      "## 3. Sơn ghi thương hiệu nhưng không ghi dòng sản phẩm",
      "Đây là chỗ chênh lệch lớn nhất trong nhóm hoàn thiện. Cùng một hãng sơn có dòng phổ thông và dòng cao cấp, giá gấp hai đến ba lần. Bảng vật tư cần ghi cả tên dòng sản phẩm, số lớp sơn lót và sơn phủ.",
      "## 4. Thiết bị vệ sinh ghi hãng nhưng thiếu mã sản phẩm",
      "Một hãng thiết bị vệ sinh có hàng chục dòng, chênh nhau nhiều lần về giá. Yêu cầu ghi mã sản phẩm cụ thể cho từng thiết bị: bồn cầu, lavabo, sen tắm, vòi.",
      "## 5. Dây điện không ghi tiết diện",
      "Tiết diện dây quyết định khả năng tải. Bảng vật tư nên ghi rõ tiết diện cho từng nhóm: chiếu sáng, ổ cắm, máy lạnh, bếp. Đây là hạng mục nằm âm trong tường, sửa lại sau này rất tốn kém — và cũng là hạng mục liên quan trực tiếp đến an toàn cháy nổ.",
      "## 6. Chống thấm ghi chung chung",
      "“Chống thấm toàn bộ khu vệ sinh” không nói lên điều gì. Cần ghi tên vật liệu, số lớp, và phạm vi — chống thấm sàn có kéo lên chân tường bao nhiêu centimet. Chi tiết này quyết định nhà có bị thấm xuống trần tầng dưới sau vài năm hay không.",
      "## Cách yêu cầu cho gọn",
      "Anh chị không cần tranh luận từng dòng. Chỉ cần đề nghị một câu: bảng vật tư ghi rõ nhà sản xuất, dòng sản phẩm hoặc mã sản phẩm, và quy cách cho từng hạng mục. Nhà thầu làm ăn nghiêm túc sẽ cung cấp được ngay, vì họ vốn đã phải tính như vậy để ra giá. Đơn vị nào tránh né câu hỏi này thì bản thân sự tránh né đã là câu trả lời.",
    ],
  },
  {
    slug: "nam-thoi-diem-nghiem-thu",
    title: "Năm thời điểm chủ nhà nhất định phải có mặt ở công trường",
    excerpt:
      "Có những hạng mục chỉ kiểm tra được đúng một lần. Qua thời điểm đó, chúng bị bê tông và lớp tô che kín.",
    date: "2026-07-05",
    category: "Kỹ thuật",
    readingTime: "6 phút đọc",
    cover: "/images/news/nghiem-thu.svg",
    body: [
      "Chủ nhà không cần ra công trường mỗi ngày. Nhưng có năm thời điểm mà nếu bỏ lỡ thì sau đó không còn cách nào kiểm tra lại, trừ khi đục phá.",
      "## 1. Sau khi xử lý nền, trước khi đổ bê tông móng",
      "Đây là lúc nhìn thấy kết quả ép cọc hoặc gia cố nền. Anh chị xin xem nhật ký ép cọc: số lượng cọc, chiều dài từng cọc, lực ép cuối. Nếu địa chất khác dự báo, khối lượng thực tế sẽ khác dự toán — biết sớm thì còn điều chỉnh ngân sách kịp, biết muộn thì thành phát sinh.",
      "## 2. Thép móng, trước khi đổ bê tông",
      "Kiểm tra đường kính thép, khoảng cách giữa các thanh, và lớp bê tông bảo vệ. Lớp bảo vệ là khoảng cách từ mép thép ra mặt ngoài bê tông, thường được giữ bằng các cục kê. Thiếu lớp này thì thép gần mặt ngoài, nước và không khí thấm tới, thép gỉ và bê tông nứt bung sau vài năm.",
      "Đây là hạng mục không thể kiểm tra lại sau khi bê tông đông cứng.",
      "## 3. Thép sàn từng tầng, trước khi đổ",
      "Tương tự thép móng, nhưng lặp lại ở mỗi tầng. Chú ý thêm vị trí thép mũ ở đầu gối dầm — đây là chỗ chịu mô men âm, hay bị đặt sai hoặc bị công nhân giẫm bẹp xuống trong lúc đi lại.",
      "## 4. Sau khi đi điện nước, trước khi tô che",
      "Thời điểm này hệ ống điện nước còn lộ trên tường. Anh chị nên chụp ảnh toàn bộ các mặt tường, lưu lại. Sau này khoan tường treo tủ hay lắp máy lạnh, bộ ảnh đó giúp tránh khoan trúng đường ống — một sự cố rất phổ biến và rất phiền.",
      "Cũng là lúc yêu cầu thử áp lực đường ống nước, để phát hiện rò rỉ trước khi mọi thứ bị che kín.",
      "## 5. Sau khi chống thấm, trước khi lát gạch",
      "Yêu cầu ngâm nước thử ít nhất 24 giờ với sàn vệ sinh và sân thượng, rồi cùng nhau xuống kiểm tra trần tầng dưới. Đây là cơ hội cuối cùng để phát hiện lỗi chống thấm. Bước này đơn giản và rẻ, nhưng bị bỏ qua rất thường xuyên vì nó làm chậm tiến độ một ngày.",
      "## Ghi lại bằng biên bản",
      "Ở mỗi thời điểm, nên có biên bản nghiệm thu ký giữa hai bên kèm ảnh chụp. Không phải để làm khó nhau, mà để khi có vấn đề sau này, cả hai bên đều nhìn vào cùng một tài liệu thay vì tranh cãi bằng trí nhớ.",
    ],
  },
  {
    slug: "ve-sinh-sau-xay-dung",
    title: "Vệ sinh sau xây dựng: vì sao chổi và nước lau nhà không xử lý được",
    excerpt:
      "Vữa và keo silicon bám trên gạch men đã đóng rắn thành lớp cứng. Chà mạnh bằng dụng cụ sai sẽ để lại vết xước vĩnh viễn trên bề mặt.",
    date: "2026-04-18",
    category: "Kỹ thuật",
    readingTime: "5 phút đọc",
    cover: "/images/news/ve-sinh-cong-nghiep.svg",
    body: [
      "Công trình vừa hoàn thiện trông có vẻ chỉ cần quét dọn là xong. Nhưng chất bẩn sau xây dựng khác hẳn bụi bẩn sinh hoạt hằng ngày, và cần cách xử lý khác.",
      "## Chất bẩn sau xây dựng là gì",
      "Chủ yếu là ba nhóm: vữa xi măng rơi vãi đã đóng rắn, keo silicon thừa quanh khung cửa và mép kính, và các vệt sơn nước hoặc sơn dầu bắn ra trong lúc thi công. Cả ba đều đã liên kết hóa học với bề mặt, không phải bụi nằm trên mặt.",
      "Nước lau nhà thông thường có tính trung tính, không phá được liên kết đó. Chà mạnh bằng miếng cọ kim loại thì bong được vết bẩn nhưng đồng thời làm xước lớp men gạch hoặc lớp phủ của kính — vết xước này không phục hồi được.",
      "## Cách xử lý đúng cho từng loại",
      "Vữa xi măng cần hóa chất gốc axit loãng để làm mềm trước, sau đó lấy đi bằng dụng cụ nhựa hoặc dao cạo chuyên dụng cầm nghiêng. Lưu ý axit làm hỏng bề mặt đá tự nhiên như marble, nên khu vực dùng đá phải xử lý bằng phương pháp khác.",
      "Keo silicon không tan trong nước, phải cắt bỏ phần khối bằng dao rồi dùng dung môi chuyên dụng xử lý phần màng mỏng còn lại.",
      "Sơn thì tùy loại: sơn nước còn mới có thể làm mềm bằng nước ấm, nhưng sơn dầu và sơn đã khô lâu cần dung môi.",
      "## Vì sao sàn cần máy chà",
      "Sàn bê tông mài và gạch khổ lớn có bề mặt rộng và các mạch chìm. Lau tay không tạo đủ áp lực đồng đều, kết quả là sàn sạch loang lổ, chỗ đậm chỗ nhạt, nhìn rõ nhất khi có ánh sáng chiếu xiên. Máy chà sàn giữ áp lực và tốc độ ổn định trên toàn bộ diện tích nên bề mặt đồng màu.",
      "## Kính trên cao",
      "Phần kính trên 4 mét không tiếp cận an toàn bằng thang. Việc này cần thi công bằng dây chuyên dụng hoặc sàn treo, có quy trình an toàn lao động riêng. Đây cũng là lý do đơn giá vệ sinh kính phân theo độ cao chứ không tính chung một mức.",
      "## Thứ tự làm",
      "Nguyên tắc là từ trên xuống dưới và từ trong ra ngoài: trần và trên cao trước, tường, rồi cửa và kính, cuối cùng mới tới sàn. Làm ngược lại thì bụi từ trên rơi xuống làm bẩn phần vừa xong, phải làm lại từ đầu.",
      "Một lưu ý cuối: nên vệ sinh sau khi đã lắp đặt xong toàn bộ thiết bị và đồ nội thất rời, tránh trường hợp vừa dọn sạch xong lại có đội khác vào khoan lắp.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const sortedPosts = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date)
);
