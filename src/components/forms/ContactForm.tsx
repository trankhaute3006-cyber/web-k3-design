"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

type Field = "name" | "phone" | "email" | "service" | "area" | "budget" | "location" | "message";
type Errors = Partial<Record<Field, string>>;

const budgets = [
  "Dưới 1 tỷ",
  "1 – 2 tỷ",
  "2 – 4 tỷ",
  "4 – 8 tỷ",
  "Trên 8 tỷ",
  "Chưa xác định",
];

/* ---------------- Kiem tra du lieu ---------------- */

function validateField(name: Field, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "Vui lòng nhập họ và tên để chúng tôi biết cách xưng hô.";
      if (v.length < 2) return "Họ tên cần ít nhất 2 ký tự.";
      return;
    case "phone": {
      if (!v) return "Vui lòng nhập số điện thoại để chúng tôi liên hệ lại.";
      const digits = v.replace(/\D/g, "");
      if (digits.length < 9 || digits.length > 11)
        return "Số điện thoại chưa đúng. Ví dụ hợp lệ: 0901 234 567.";
      return;
    }
    case "email":
      if (!v) return;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
        return "Email chưa đúng định dạng. Ví dụ: ten@congty.com.";
      return;
    case "service":
      if (!v) return "Vui lòng chọn dịch vụ anh chị quan tâm.";
      return;
    case "message":
      if (!v) return "Vui lòng mô tả ngắn nhu cầu để chúng tôi chuẩn bị trước.";
      if (v.length < 10) return "Mô tả cần ít nhất 10 ký tự.";
      return;
    default:
      return;
  }
}

const required: Field[] = ["name", "phone", "service", "message"];

/* ---------------- Cac o nhap ---------------- */

const fieldBase =
  "w-full min-h-12 rounded-xl border bg-canvas-alt px-4 text-[1rem] text-ink placeholder:text-muted-fg/70 " +
  "transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-0";

function fieldClass(hasError: boolean) {
  return cn(
    fieldBase,
    hasError
      ? "border-danger focus:border-danger"
      : "border-line-strong focus:border-accent"
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-1.5 text-sm text-danger"
    >
      <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: string;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-display text-sm font-semibold text-ink"
    >
      {children}
      {optional ? (
        <span className="ml-1.5 font-normal text-muted-fg">(không bắt buộc)</span>
      ) : (
        <span className="ml-1 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

/* ---------------- Form ---------------- */

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState("");

  const configured = Boolean(site.web3formsKey);

  // Kiem tra khi roi khoi o nhap, khong kiem tra tung phim go
  const handleBlur = (e: {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  }) => {
    const { name, value } = e.target;
    const message = validateField(name as Field, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Kiem tra toan bo
    const next: Errors = {};
    (["name", "phone", "email", "service", "message"] as Field[]).forEach((f) => {
      const msg = validateField(f, String(data.get(f) ?? ""));
      if (msg) next[f] = msg;
    });
    setErrors(next);

    const firstInvalid = required.find((f) => next[f]) ?? (Object.keys(next)[0] as Field | undefined);
    if (firstInvalid) {
      const el = form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    if (!configured) {
      setStatus("failed");
      setServerMessage(
        "Form chưa được cấu hình. Vui lòng lấy access key miễn phí tại web3forms.com rồi điền vào src/data/site.ts."
      );
      return;
    }

    setStatus("sending");
    setServerMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `[${site.name}] Yêu cầu tư vấn mới từ ${data.get("name")}`,
          from_name: site.name,
          "Họ và tên": data.get("name"),
          "Số điện thoại": data.get("phone"),
          Email: data.get("email") || "(không cung cấp)",
          "Dịch vụ quan tâm": data.get("service"),
          "Địa điểm công trình": data.get("location") || "(chưa cung cấp)",
          "Diện tích dự kiến": data.get("area") || "(chưa cung cấp)",
          "Ngân sách dự kiến": data.get("budget") || "(chưa xác định)",
          "Nội dung": data.get("message"),
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("sent");
        form.reset();
        setErrors({});
      } else {
        setStatus("failed");
        setServerMessage(
          json.message ||
            "Không gửi được yêu cầu. Anh chị vui lòng thử lại hoặc gọi trực tiếp cho chúng tôi."
        );
      }
    } catch {
      setStatus("failed");
      setServerMessage(
        "Không kết nối được tới máy chủ. Anh chị kiểm tra kết nối mạng và thử lại, hoặc gọi trực tiếp cho chúng tôi."
      );
    }
  };

  /* -------- Trang thai da gui thanh cong -------- */
  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-success/30 bg-success/8 p-8 text-center sm:p-12"
      >
        <CheckCircle2
          size={44}
          className="mx-auto text-success"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <h3 className="mt-5 text-2xl">Đã nhận được yêu cầu của anh chị</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-fg">
          Chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc để hẹn lịch khảo sát.
          Nếu cần gấp, anh chị có thể gọi trực tiếp{" "}
          <a
            href={`tel:${site.phoneRaw}`}
            className="tabular font-semibold text-accent underline underline-offset-4"
          >
            {site.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 min-h-12 cursor-pointer px-6 font-display font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
        >
          Gửi thêm một yêu cầu khác
        </button>
      </div>
    );
  }

  const errorList = (Object.entries(errors) as [Field, string | undefined][]).filter(
    ([, v]) => v
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Tom tat loi — co the bam de nhay toi o sai */}
      {errorList.length > 1 ? (
        <div
          role="alert"
          className="rounded-2xl border border-danger/30 bg-danger/5 p-5"
        >
          <p className="flex items-center gap-2 font-display font-semibold text-danger">
            <TriangleAlert size={18} aria-hidden="true" />
            Còn {errorList.length} mục cần chỉnh lại
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {errorList.map(([field, message]) => (
              <li key={field}>
                <button
                  type="button"
                  onClick={() =>
                    formRef.current
                      ?.querySelector<HTMLElement>(`[name="${field}"]`)
                      ?.focus()
                  }
                  className="cursor-pointer text-left text-danger underline underline-offset-2"
                >
                  {message}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Họ và tên</Label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={fieldClass(Boolean(errors.name))}
          />
          <FieldError id="err-name" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0901 234 567"
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "err-phone" : "hint-phone"}
            className={cn(fieldClass(Boolean(errors.phone)), "tabular")}
          />
          {errors.phone ? (
            <FieldError id="err-phone" message={errors.phone} />
          ) : (
            <p id="hint-phone" className="mt-2 text-sm text-muted-fg">
              Chúng tôi chỉ gọi trong giờ hành chính.
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" optional>
            Email
          </Label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ten@congty.com"
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
            className={fieldClass(Boolean(errors.email))}
          />
          <FieldError id="err-email" message={errors.email} />
        </div>

        <div>
          <Label htmlFor="service">Dịch vụ quan tâm</Label>
          <select
            id="service"
            name="service"
            defaultValue=""
            onBlur={handleBlur}
            onChange={handleBlur}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "err-service" : undefined}
            className={cn(fieldClass(Boolean(errors.service)), "cursor-pointer")}
          >
            <option value="" disabled>
              — Chọn dịch vụ —
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Khác / chưa rõ">Khác / chưa rõ</option>
          </select>
          <FieldError id="err-service" message={errors.service} />
        </div>

        <div>
          <Label htmlFor="location" optional>
            Địa điểm công trình
          </Label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Quận 7, TP.HCM"
            className={fieldClass(false)}
          />
        </div>

        <div>
          <Label htmlFor="area" optional>
            Diện tích dự kiến
          </Label>
          <input
            id="area"
            name="area"
            type="text"
            inputMode="numeric"
            placeholder="5 × 20 m, 4 tầng"
            className={fieldClass(false)}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="budget" optional>
            Ngân sách dự kiến
          </Label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={cn(fieldClass(false), "cursor-pointer")}
          >
            <option value="">— Chưa xác định —</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-muted-fg">
            Biết khoảng ngân sách giúp chúng tôi đề xuất phương án sát thực tế
            ngay từ buổi đầu.
          </p>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Mô tả nhu cầu</Label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Ví dụ: Tôi có lô đất 5×18 m ở Gò Vấp, muốn xây nhà 3 tầng cho gia đình 5 người, dự kiến khởi công đầu năm sau."
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "err-message" : undefined}
            className={cn(
              fieldClass(Boolean(errors.message)),
              "min-h-36 rounded-2xl py-3 leading-relaxed"
            )}
          />
          <FieldError id="err-message" message={errors.message} />
        </div>
      </div>

      {/* Loi tu may chu */}
      {status === "failed" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger/5 p-5 text-sm text-danger"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            {serverMessage}{" "}
            <a
              href={`tel:${site.phoneRaw}`}
              className="tabular font-semibold underline underline-offset-4"
            >
              {site.phone}
            </a>
          </span>
        </div>
      ) : null}

      {!configured ? (
        <p className="rounded-2xl border border-line-strong bg-accent-soft p-4 text-sm text-muted-fg">
          <strong className="font-semibold text-ink">Lưu ý cho quản trị viên:</strong>{" "}
          form chưa gửi được vì chưa có access key. Lấy key miễn phí tại
          web3forms.com và điền vào <code className="text-ink">site.web3formsKey</code>{" "}
          trong <code className="text-ink">src/data/site.ts</code>.
        </p>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-fg">
          Thông tin của anh chị chỉ dùng để liên hệ tư vấn, không chia sẻ cho
          bên thứ ba.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-14 shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-accent px-8 font-display font-semibold text-white shadow-e1 transition-[background-color,transform] duration-200 hover:bg-accent-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={19} className="animate-spin" aria-hidden="true" />
              Đang gửi…
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              Gửi yêu cầu tư vấn
            </>
          )}
        </button>
      </div>

      {/* Thong bao cho trinh doc man hinh */}
      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Đang gửi yêu cầu, vui lòng đợi." : ""}
      </p>
    </form>
  );
}
