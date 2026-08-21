# Hướng dẫn đưa website lên mạng

Viết cho người chưa từng làm. Làm đúng thứ tự, không cần hiểu kỹ thuật.

Chọn **một trong hai cách**. Cách 1 nhanh, làm ngay được. Cách 2 mất thêm
5 phút nhưng làm một lần rồi thôi, sau này không phải đụng tới nữa.

---

# CÁCH 1 — Tải file về rồi tự đưa lên (khoảng 5 phút)

## Bước 1. Tải file website về máy

**1.1.** Mở trình duyệt, vào địa chỉ này:

```
https://github.com/trankhaute3006-cyber/web-k3-design/actions
```

**1.2.** Anh sẽ thấy một danh sách. Tìm dòng có chữ **"Build va tao file ZIP de upload thu cong"** và có **dấu tích xanh ✅** ở bên trái.

> Nếu thấy dấu ✅ thì tốt. Nếu thấy dấu ❌ đỏ thì bỏ qua dòng đó, tìm dòng khác có dấu xanh. Nếu thấy vòng tròn vàng đang quay nghĩa là đang chạy, đợi 2 phút rồi tải lại trang.

**1.3.** Bấm vào dòng đó (bấm vào phần chữ).

**1.4.** Trang mới mở ra. **Kéo chuột xuống cuối trang.**

**1.5.** Ở gần cuối có ô tên **"Artifacts"**. Bên dưới có một dòng chữ xanh: **`k3design-website`**.

**1.6.** Bấm vào chữ `k3design-website` đó. Máy sẽ tải về một file tên `k3design-website.zip`.

> File này thường nằm trong thư mục **Downloads** (Tải xuống) trên máy anh.

**⚠️ Đừng giải nén file này ở máy.** Cứ để nguyên file `.zip`.

---

## Bước 2. Đăng nhập hosting

**2.1.** Vào địa chỉ:

```
https://hpanel.hostinger.com
```

**2.2.** Đăng nhập bằng tài khoản Hostinger của anh.

**2.3.** Bấm vào website `k3design.online` trong danh sách.

---

## Bước 3. Mở trình quản lý file

**3.1.** Ở menu bên trái, tìm mục **"Files"** (hoặc **"Tệp"**).

**3.2.** Bấm vào **"File Manager"** (hoặc **"Trình quản lý tệp"**).

**3.3.** Một cửa sổ mới mở ra, hiện danh sách thư mục.

**3.4.** Bấm đúp vào thư mục **`public_html`** để đi vào trong.

> Đây là thư mục chứa website. Mọi thứ bên trong nó chính là những gì
> người ta thấy khi vào `k3design.online`.

---

## Bước 4. Bật hiện file ẩn — QUAN TRỌNG, ĐỪNG BỎ QUA

**4.1.** Tìm biểu tượng **bánh răng ⚙️** hoặc chữ **"Settings"** ở góc trên bên phải cửa sổ File Manager.

**4.2.** Bấm vào, tìm dòng **"Show hidden files"** (hoặc **"Hiện tệp ẩn"**, hoặc **"Show dotfiles"**).

**4.3.** **Bật nó lên.**

> **Vì sao bắt buộc:** website có một file tên `.htaccess` bắt đầu bằng
> dấu chấm nên bị ẩn. Thiếu file này thì các trang như `/du-an/`,
> `/dich-vu/` sẽ báo **lỗi 404 không tìm thấy**. Chỉ trang chủ chạy được.

---

## Bước 5. Xóa file cũ

**5.1.** Bấm **Ctrl + A** để chọn tất cả file đang có trong `public_html`.

**5.2.** Nhấn phím **Delete**, xác nhận xóa.

> **Đừng lo mất website.** File mới sắp thay thế hoàn toàn. Nếu thấy thư
> mục tên `.well-known` thì bỏ chọn nó ra, giữ lại — đó là file của chứng
> chỉ bảo mật SSL.

---

## Bước 6. Đưa file mới lên

**6.1.** Tìm biểu tượng **mũi tên đi lên ⬆️** hoặc chữ **"Upload"** ở thanh công cụ phía trên.

**6.2.** Bấm vào, chọn file `k3design-website.zip` vừa tải ở Bước 1.

**6.3.** Đợi thanh tiến trình chạy xong. File khoảng 8 MB nên mất chừng 30 giây.

**6.4.** Sau khi xong, anh thấy file `k3design-website.zip` xuất hiện trong danh sách.

**6.5.** **Bấm chuột phải** vào file đó → chọn **"Extract"** (hoặc **"Giải nén"**).

**6.6.** Nó hỏi giải nén vào đâu — cứ để nguyên (`public_html`), bấm **Extract**.

**6.7.** Xong rồi thì **xóa file `k3design-website.zip`** đi cho gọn.

---

## Bước 7. Kiểm tra

**7.1.** Mở tab mới, vào `https://k3design.online`

**7.2.** Nhấn **Ctrl + F5** (bắt trình duyệt tải lại hoàn toàn, không dùng bản cũ đã lưu).

**7.3.** Bấm thử vào **Dịch vụ**, **Dự án**, **Tin tức** xem có mở được không.

Nếu cả 3 trang mở được → **xong rồi**. Nếu trang chủ chạy mà trang con báo
lỗi 404 → quay lại **Bước 4**, file `.htaccess` chưa được đưa lên.

---
---

# CÁCH 2 — Khai một lần, sau này tự động mãi mãi

Làm cách này thì mỗi lần có thay đổi, website tự cập nhật sau 3 phút.
Không phải tải file, không phải upload gì nữa.

## Bước 1. Lấy thông tin FTP từ Hostinger

**1.1.** Vào `https://hpanel.hostinger.com`, chọn website `k3design.online`.

**1.2.** Menu bên trái → **"Files"** → **"FTP Accounts"**.

**1.3.** Trên màn hình hiện ra, ghi lại **3 thông tin** (chép ra giấy hoặc mở Notepad):

| Trên màn hình ghi là | Ví dụ trông như thế nào |
| --- | --- |
| **FTP hostname** (hoặc FTP IP) | `ftp.k3design.online` hoặc `123.45.67.89` |
| **FTP username** | `u123456789.k3design` |
| **FTP password** | mật khẩu anh đặt |

> **Không nhớ mật khẩu?** Trên trang đó có nút **"Change FTP account password"** — bấm vào đặt mật khẩu mới, rồi ghi lại.

---

## Bước 2. Khai vào GitHub

**2.1.** Mở địa chỉ này:

```
https://github.com/trankhaute3006-cyber/web-k3-design/settings/secrets/actions
```

**2.2.** Bấm nút xanh **"New repository secret"** ở góc phải.

**2.3.** Hiện ra 2 ô. Điền:

- Ô **Name**: gõ `FTP_SERVER`
- Ô **Secret**: dán **FTP hostname** ở Bước 1

Bấm **"Add secret"**.

**2.4.** Bấm **"New repository secret"** lần nữa:

- Ô **Name**: gõ `FTP_USERNAME`
- Ô **Secret**: dán **FTP username**

Bấm **"Add secret"**.

**2.5.** Bấm **"New repository secret"** lần thứ ba:

- Ô **Name**: gõ `FTP_PASSWORD`
- Ô **Secret**: dán **FTP password**

Bấm **"Add secret"**.

**2.6.** Kiểm tra: màn hình phải hiện đủ **3 dòng** — `FTP_SERVER`,
`FTP_USERNAME`, `FTP_PASSWORD`.

> **Ba lỗi hay gặp khi gõ tên:**
> - Gõ thường `ftp_server` — **sai**, phải VIẾT HOA hết
> - Gõ `FTP-SERVER` — **sai**, phải là dấu gạch dưới `_`
> - Thừa khoảng trắng ở đầu hoặc cuối khi dán giá trị
>
> **Hai lỗi hay gặp khi dán giá trị:**
> - Dán `ftp://ftp.k3design.online` — **bỏ phần `ftp://`** đi
> - Username chỉ gõ tên mình đặt, quên phần `u123456789.` ở đầu

---

## Bước 3. Chạy

**3.1.** Vào `https://github.com/trankhaute3006-cyber/web-k3-design/actions`

**3.2.** Cột bên trái, bấm **"Build & Deploy to Hostinger"**.

**3.3.** Bên phải hiện nút **"Run workflow"** — bấm vào, rồi bấm nút
**"Run workflow"** màu xanh hiện ra.

**3.4.** Đợi 2–4 phút. Tải lại trang.

- Thấy **dấu tích xanh ✅** → xong, website đã cập nhật
- Thấy **dấu ❌ đỏ** → bấm vào xem, thường là gõ sai tên secret ở Bước 2

**3.5.** Vào `https://k3design.online`, nhấn **Ctrl + F5** để kiểm tra.

---
---

# Sau khi website lên xong

## Việc 1. Thử form liên hệ

Vào `https://k3design.online/lien-he/`, điền thử một yêu cầu rồi bấm gửi.

Kiểm tra hộp thư `k3design2025@gmail.com` — **nhớ xem cả thư mục Spam**.

Nếu email rơi vào Spam: mở email đó, bấm **"Không phải spam"**, và thêm
địa chỉ người gửi vào danh bạ. Vài email đầu hay bị lọc nhầm.

## Việc 2. Khai báo với Google

Không làm bước này thì Google mất vài tuần mới tự tìm ra website.

1. Vào `https://search.google.com/search-console`
2. Đăng nhập bằng Gmail của công ty
3. Bấm **"Add property"** → chọn ô **"URL prefix"** → gõ `https://k3design.online`
4. Google yêu cầu xác minh — chọn cách **"HTML tag"**, copy đoạn mã nó cho
   rồi gửi cho người làm web dán vào
5. Xác minh xong → menu trái bấm **"Sitemaps"** → gõ `sitemap.xml` → bấm **Submit**

## Việc 3. Điền tọa độ văn phòng

Việc này giúp website lọt vào hộp bản đồ khi khách tìm "xây nhà gần đây".

1. Mở `https://maps.google.com`
2. Tìm địa chỉ văn phòng: `26/10/2b Đường Làng Tăng Phú, Tăng Nhơn Phú`
3. **Bấm chuột phải** đúng vào vị trí văn phòng trên bản đồ
4. Dòng đầu tiên hiện ra là hai con số, ví dụ `10.845123, 106.775456`
5. Bấm vào hai số đó để copy, rồi gửi cho người làm web

## Việc 4. Đăng ký Google Doanh nghiệp

Đây là việc **hiệu quả nhất** để khách tìm thấy K3, và miễn phí.

1. Vào `https://business.google.com`
2. Tạo hồ sơ với tên **CÔNG TY TNHH K3 DESIGN**, địa chỉ văn phòng thật
3. Google gửi **thư bưu điện** về địa chỉ đó kèm mã xác minh — mất 1–2 tuần
4. Nhập mã để xác minh
5. Sau đó: đăng ảnh công trình thật đều đặn, và **xin khách cũ để lại
   đánh giá 5 sao** — đây là yếu tố mạnh nhất giúp lọt vào hộp bản đồ

---

# Khi gặp trục trặc

| Hiện tượng | Nguyên nhân | Cách xử lý |
| --- | --- | --- |
| Trang chủ chạy, trang con báo 404 | Thiếu file `.htaccess` | Cách 1, Bước 4 — bật hiện file ẩn rồi làm lại |
| Website vẫn y như cũ | Trình duyệt dùng bản đã lưu | Nhấn **Ctrl + F5**, hoặc mở tab ẩn danh |
| Chỉ thấy danh sách thư mục | File giải nén vào sai chỗ | Kiểm tra `index.html` có nằm ngay trong `public_html` không |
| Mất hết CSS, trang chỉ còn chữ | Thiếu thư mục `_next` | Giải nén lại, đảm bảo lấy hết file |
| `ERR_TOO_MANY_REDIRECTS` | SSL chưa sẵn sàng | Đợi 15 phút. Còn lỗi thì hPanel → Security → SSL → cài lại |
| Actions báo ❌ ở bước FTP | Sai tên hoặc giá trị secret | Cách 2, Bước 2 — xem lại 5 lỗi hay gặp |
