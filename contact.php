<?php
/**
 * ============================================================
 *  K3 DESIGN — NHAN YEU CAU TU VAN TU FORM LIEN HE
 * ============================================================
 *
 *  File nay chay tren Hostinger (PHP co san tren moi goi shared).
 *  Khong can dang ky dich vu ngoai, khong can API key.
 *
 *  Website la HTML tinh, rieng file nay chay phia may chu de gui mail.
 *
 *  [SUA] Doi dia chi nhan mail o hang $TO ben duoi.
 *
 *  LUU Y: file nay CHI chay tren may chu that. Chay `npm run dev` o may
 *  ca nhan se khong goi duoc, vi Next.js khong chay PHP.
 */

declare(strict_types=1);

/* ---------- Cau hinh ---------- */

$TO         = 'k3design2025@gmail.com';  // [SUA] hop thu nhan yeu cau
$SITE_NAME  = 'K3 Design';
$MAX_PER_HOUR = 20;                       // chan gui hang loat tu cung mot IP

/* ---------- Chi nhan POST ---------- */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(
        ['success' => false, 'message' => 'Phương thức không được hỗ trợ.'],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

/* ---------- Doc du lieu ---------- */

$raw  = file_get_contents('php://input');
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$get = static function (string $key) use ($data): string {
    return isset($data[$key]) && is_scalar($data[$key]) ? (string) $data[$key] : '';
};

/* ---------- Bay bot ---------- */
/* O "website" duoc an bang CSS. Nguoi that khong bao gio dien vao no,
   bot tu dong dien moi o nen se lo. Tra ve thanh cong gia de bot khong
   thu lai bang cach khac. */

if (trim($get('website')) !== '') {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

/* ---------- Lam sach ---------- */

/** Dung cho dong tieu de mail: bo xuong dong de chan chen header */
$cleanLine = static function (string $v, int $max = 200): string {
    $v = preg_replace('/[\r\n]+/u', ' ', trim($v)) ?? '';
    return mb_substr($v, 0, $max, 'UTF-8');
};

/** Dung cho phan noi dung: giu xuong dong */
$cleanText = static function (string $v, int $max = 3000): string {
    $v = str_replace("\r\n", "\n", trim($v));
    $v = preg_replace('/\n{4,}/u', "\n\n\n", $v) ?? '';
    return mb_substr($v, 0, $max, 'UTF-8');
};

$name     = $cleanLine($get('name'), 120);
$phone    = $cleanLine($get('phone'), 40);
$email    = $cleanLine($get('email'), 160);
$service  = $cleanLine($get('service'), 120);
$location = $cleanLine($get('location'), 200);
$area     = $cleanLine($get('area'), 120);
$budget   = $cleanLine($get('budget'), 120);
$message  = $cleanText($get('message'));

/* ---------- Kiem tra bat buoc ---------- */

$errors = [];
if ($name === '')                                  $errors[] = 'họ tên';
if (preg_match('/^[0-9+\s.\-()]{9,20}$/', $phone) !== 1) $errors[] = 'số điện thoại';
if ($service === '')                               $errors[] = 'dịch vụ quan tâm';
if (mb_strlen($message, 'UTF-8') < 10)             $errors[] = 'nội dung yêu cầu';

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}

if ($errors) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Thông tin chưa hợp lệ ở mục: ' . implode(', ', $errors) . '.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/* ---------- Chan gui hang loat ---------- */

$ip   = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$file = sys_get_temp_dir() . '/k3-form-' . md5($ip) . '.txt';
$now  = time();
$hits = [];

if (is_readable($file)) {
    $saved = json_decode((string) file_get_contents($file), true);
    if (is_array($saved)) {
        $hits = array_filter($saved, static fn($t) => is_int($t) && $now - $t < 3600);
    }
}

if (count($hits) >= $MAX_PER_HOUR) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Anh chị đã gửi khá nhiều yêu cầu. Vui lòng gọi trực tiếp giúp chúng tôi.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$hits[] = $now;
@file_put_contents($file, json_encode(array_values($hits)));

/* ---------- Soan mail ---------- */

$host = preg_replace('/^www\./', '', (string) ($_SERVER['HTTP_HOST'] ?? 'localhost'));
$from = 'no-reply@' . $host;   // phai cung ten mien thi mail moi it vao spam

$subject = "[{$SITE_NAME}] Yêu cầu tư vấn mới từ {$name}";

$rows = [
    'Họ và tên'           => $name,
    'Số điện thoại'       => $phone,
    'Email'               => $email !== '' ? $email : '(không cung cấp)',
    'Dịch vụ quan tâm'    => $service,
    'Địa điểm công trình' => $location !== '' ? $location : '(chưa cung cấp)',
    'Diện tích dự kiến'   => $area !== '' ? $area : '(chưa cung cấp)',
    'Ngân sách dự kiến'   => $budget !== '' ? $budget : '(chưa xác định)',
];

$body = "YÊU CẦU TƯ VẤN MỚI TỪ WEBSITE\n";
$body .= str_repeat('=', 46) . "\n\n";
foreach ($rows as $label => $value) {
    // Khong dung str_pad vi no dem theo byte — nhan tieng Viet co dau se le cot
    $key = $label . ':';
    $pad = max(1, 22 - mb_strlen($key, 'UTF-8'));
    $body .= $key . str_repeat(' ', $pad) . $value . "\n";
}
$body .= "\nNỘI DUNG YÊU CẦU\n";
$body .= str_repeat('-', 46) . "\n";
$body .= $message . "\n\n";
$body .= str_repeat('=', 46) . "\n";
$body .= 'Thời gian: ' . date('H:i:s d/m/Y') . " (giờ máy chủ)\n";
$body .= "Địa chỉ IP: {$ip}\n";
$body .= "Gửi từ: https://{$host}/lien-he/\n";

$headers = [
    'From: ' . mb_encode_mimeheader($SITE_NAME, 'UTF-8') . " <{$from}>",
    'Reply-To: ' . ($email !== '' ? $email : $from),
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
    'X-Mailer: K3 Design Website',
];

$ok = @mail(
    $TO,
    mb_encode_mimeheader($subject, 'UTF-8'),
    $body,
    implode("\r\n", $headers),
    '-f' . $from
);

/* ---------- Tra ket qua ---------- */

if ($ok) {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => 'Máy chủ chưa gửi được yêu cầu. Anh chị vui lòng gọi trực tiếp giúp chúng tôi.',
], JSON_UNESCAPED_UNICODE);
