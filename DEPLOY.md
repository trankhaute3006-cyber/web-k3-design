# Hướng dẫn đưa website lên GitHub và Hostinger

Tài liệu này viết cho người chưa từng dùng GitHub. Làm đúng thứ tự từ trên xuống là được.

---

## Phần 0 — Chuẩn bị (làm một lần)

Cần có sẵn trên máy:

| Thứ cần | Kiểm tra bằng lệnh | Nếu chưa có |
| --- | --- | --- |
| Node.js 20+ | `node --version` | Tải tại nodejs.org, chọn bản LTS |
| Git | `git --version` | Tải tại git-scm.com |
| Tài khoản GitHub | — | Đăng ký tại github.com |
| Tài khoản Hostinger | — | Đã có |

---

## Phần 1 — Đẩy mã nguồn lên GitHub

### 1.1. Tạo repository trống trên GitHub

1. Vào https://github.com/new
2. **Repository name**: `k3-design-website`
3. Chọn **Private** (khuyến nghị — mã nguồn không cần công khai)
4. **KHÔNG** tick "Add a README file", "Add .gitignore" hay "Choose a license"
5. Bấm **Create repository**
6. Copy đường dẫn hiện ra, dạng `https://github.com/<tên-của-anh>/k3-design-website.git`

### 1.2. Đẩy code lên

Mở terminal tại thư mục dự án rồi chạy lần lượt:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Khoi tao website K3 Design"
```

```bash
git branch -M main
```

Thay `<URL>` bằng đường dẫn đã copy ở bước 1.1:

```bash
git remote add origin <URL>
```

```bash
git push -u origin main
```

Lần đầu push, GitHub sẽ hỏi đăng nhập. Nếu hiện cửa sổ trình duyệt thì đăng nhập bình thường.

> **Nếu GitHub báo lỗi "Support for password authentication was removed"**: vào
> github.com → ảnh đại diện → Settings → Developer settings → Personal access
> tokens → Tokens (classic) → Generate new token, tick quyền `repo`, rồi dùng
> token đó thay cho mật khẩu.

---

## Phần 2 — Lấy thông tin FTP từ Hostinger

1. Đăng nhập hPanel: https://hpanel.hostinger.com
2. Chọn website của anh → menu trái tìm **Files** → **FTP Accounts**
3. Ghi lại 3 thông tin:

| Tên | Ví dụ | Ghi chú |
| --- | --- | --- |
| **FTP hostname** | `ftp.k3design.vn` hoặc `123.45.67.89` | Đây là `FTP_SERVER` |
| **FTP username** | `u123456789.k3design` | Đây là `FTP_USERNAME` |
| **FTP password** | (do anh đặt) | Đây là `FTP_PASSWORD` |

> Nếu không nhớ mật khẩu, bấm **Change FTP account password** để đặt lại.

4. Xác định thư mục gốc của website:
   - Tên miền chính → thư mục là `public_html/`
   - Addon domain / subdomain → thường là `public_html/tenmien.com/` (xem trong **File Manager**)

---

## Phần 3 — Khai báo thông tin FTP vào GitHub

> **Quan trọng về bảo mật**: anh tự nhập các giá trị này trên GitHub. Không gửi
> mật khẩu FTP qua chat, không ghi vào file trong repo.

1. Vào repository vừa tạo trên GitHub
2. Tab **Settings** → menu trái **Secrets and variables** → **Actions**
3. Bấm **New repository secret**, tạo lần lượt 3 (hoặc 4) mục:

| Name | Secret |
| --- | --- |
| `FTP_SERVER` | hostname FTP ở bước 2 |
| `FTP_USERNAME` | username FTP |
| `FTP_PASSWORD` | mật khẩu FTP |
| `FTP_SERVER_DIR` | *(chỉ tạo nếu KHÔNG phải `public_html/`)* — ví dụ `public_html/k3design.vn/` |

Tên phải viết **chính xác** như bảng trên, kể cả chữ hoa và dấu gạch dưới.

---

## Phần 4 — Chạy deploy

Sau khi đã tạo secrets, mỗi lần anh push code lên nhánh `main`, website sẽ tự
động build và lên Hostinger.

**Chạy ngay lần đầu:**

1. Vào repository → tab **Actions**
2. Chọn workflow **Build & Deploy to Hostinger** ở cột trái
3. Bấm **Run workflow** → **Run workflow**
4. Đợi khoảng 2 – 4 phút. Dấu ✅ xanh là xong.

Mở tên miền để kiểm tra.

---

## Phần 5 — Bật SSL (https)

1. hPanel → **Security** → **SSL**
2. Chọn website → **Install SSL** (Let's Encrypt miễn phí)
3. Đợi 5 – 15 phút để chứng chỉ có hiệu lực

File `.htaccess` đã có sẵn quy tắc bắt buộc chuyển sang `https`, nên sau khi
SSL hoạt động thì mọi truy cập `http` sẽ tự chuyển sang `https`.

> **Lưu ý**: bật quy tắc HTTPS *trước khi* SSL sẵn sàng sẽ gây lỗi lặp chuyển
> hướng. Nếu gặp, tạm xóa 3 dòng `RewriteCond %{HTTPS}` … `RewriteRule` trong
> `public/.htaccess`, deploy lại, rồi bật lại sau khi SSL xong.

---

## Phần 6 — Cách cập nhật nội dung về sau

Toàn bộ nội dung nằm trong thư mục `src/data/`:

| Muốn sửa gì | Mở file |
| --- | --- |
| Tên công ty, hotline, địa chỉ, email, Zalo, MST, số liệu | `src/data/site.ts` |
| Danh sách dịch vụ và giá tham khảo | `src/data/services.ts` |
| Dự án (thêm/sửa/xóa công trình) | `src/data/projects.ts` |
| Bài viết tin tức | `src/data/posts.ts` |
| Quy trình, cảm nhận khách hàng, câu hỏi thường gặp | `src/data/content.ts` |
| Menu điều hướng | `src/data/nav.ts` |

Sau khi sửa xong:

```bash
git add .
```

```bash
git commit -m "Cap nhat noi dung"
```

```bash
git push
```

Khoảng 3 phút sau website tự cập nhật. Không cần làm gì thêm.

---

## Phần 7 — Thay ảnh thật vào

1. Đặt ảnh vào `public/images/projects/` (dự án) hoặc `public/images/news/` (bài viết)
2. Nên dùng định dạng **.webp**, chiều rộng khoảng 1600px, dung lượng dưới 300 KB mỗi ảnh
3. Mở `src/data/projects.ts`, sửa đường dẫn:

```ts
cover: "/images/projects/ten-file-anh-that.webp",
gallery: [
  { src: "/images/projects/anh-1.webp", caption: "Mặt tiền nhìn từ đường" },
],
```

4. Chú thích trong `caption` cũng chính là nội dung mô tả ảnh cho người khiếm
   thị và cho Google, nên viết rõ ràng.

---

## Phần 8 — Bật form liên hệ

Vì Hostinger gói shared không chạy được Node.js, form gửi qua dịch vụ Web3Forms
(miễn phí, không giới hạn số lượt cho mức cơ bản).

1. Vào https://web3forms.com
2. Nhập email nhận thông báo → bấm **Create Access Key**
3. Kiểm tra hộp thư, copy access key
4. Mở `src/data/site.ts`, dán vào:

```ts
web3formsKey: "dan-access-key-vao-day",
```

5. `git add . && git commit -m "Bat form lien he" && git push`

Trước khi có key, form vẫn hiển thị bình thường và báo rõ cho quản trị viên,
nhưng chưa gửi được.

---

## Phần 9 — Cách deploy thủ công (khi không muốn dùng GitHub Actions)

```bash
npm run build
```

Sau đó nén toàn bộ **nội dung bên trong** thư mục `out/` (không nén cả thư mục
`out`) thành file `.zip`, rồi:

1. hPanel → **File Manager** → vào `public_html`
2. Xóa các file cũ (giữ lại thư mục `.well-known` nếu có)
3. **Upload** file zip → chuột phải → **Extract**

> Nhớ bật hiện file ẩn trong File Manager để thấy `.htaccess`.

---

## Xử lý sự cố

| Hiện tượng | Nguyên nhân thường gặp | Cách xử lý |
| --- | --- | --- |
| Actions báo đỏ ở bước FTP | Sai `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD` | Kiểm tra lại 3 secret, chú ý khoảng trắng thừa khi copy |
| Deploy xong nhưng vẫn thấy trang cũ | Trình duyệt lưu cache | Ctrl + F5, hoặc mở tab ẩn danh |
| Trang chủ hiện danh sách thư mục | Chưa có `index.html` ở đúng chỗ | Kiểm tra `FTP_SERVER_DIR` có trỏ đúng thư mục gốc không |
| CSS mất, trang chỉ còn chữ | Thư mục `_next` chưa được tải lên | Chạy lại workflow; kiểm tra File Manager có thư mục `_next` không |
| Lỗi lặp chuyển hướng (`ERR_TOO_MANY_REDIRECTS`) | Bật ép HTTPS khi chưa có SSL | Xem ghi chú ở Phần 5 |
| Ảnh không hiện | Sai đường dẫn hoặc sai chữ hoa/thường trong tên file | Linux phân biệt hoa thường: `Anh.WEBP` ≠ `anh.webp` |
| Vào `/du-an` bị 404 | Thiếu `.htaccess` | Kiểm tra `public_html/.htaccess` có tồn tại không (bật hiện file ẩn) |
