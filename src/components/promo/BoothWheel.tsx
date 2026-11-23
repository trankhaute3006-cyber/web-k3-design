"use client";

import { useEffect, useRef, useState } from "react";
import { PrizeWheel, spinAngle } from "./PrizeWheel";
import { prizes as defaultPrizes, type Prize } from "@/data/promo";
import { Button } from "@/components/ui/Primitives";

/**
 * CONG CU NHAN VIEN TRUC BOOTH — trang /vong-quay/ (an, chan Google).
 *
 * ===================== DOC KY TRUOC KHI SUA =====================
 * Quy giai va nhat ky luu bang localStorage, tuc la nam tren DUNG MOT MAY
 * va dung mot trinh duyet. Day la CO Y: moi toa chung cu mot may truc booth,
 * mot quy giai rieng. Khong phai loi.
 *
 * He qua phai nho:
 *  - Doi may, doi trinh duyet, hay mo tab an danh = quy giai moi tinh.
 *  - Xoa du lieu duyet web la mat sach nhat ky.
 *  => Cuoi moi buoi BAT BUOC bam "Sao chep nhat ky" va dan vao sheet theo doi.
 *
 * Muon quy giai dung chung that giua nhieu may thi phai co may chu — website
 * nay la HTML tinh tren Hostinger nen khong lam duoc.
 * ================================================================
 */

const STORAGE_KEY = "k3-vong-quay-v1";

type PoolItem = Prize & { left: number };

type LogEntry = {
  time: string;
  apt: string;
  key: string;
  name: string;
  phone: string;
  prize: string;
  value: number;
};

type State = { pool: PoolItem[]; log: LogEntry[] };

const freshState = (): State => ({
  pool: defaultPrizes.map((p) => ({ ...p, left: p.quantity })),
  log: [],
});

/** "S6.02 - 1205" va "s602-1205" phai duoc coi la CUNG mot can ho */
const aptKey = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

const fmt = (n: number) => n.toLocaleString("vi-VN");

export function BoothWheel() {
  const [state, setState] = useState<State>(freshState);
  // Chi ghi xuong localStorage SAU khi da doc xong, keo ghi de mat du lieu that
  const [loaded, setLoaded] = useState(false);

  const [apt, setApt] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [msg, setMsg] = useState("");
  const [won, setWon] = useState<{ prize: PoolItem; apt: string } | null>(null);
  const [copyMsg, setCopyMsg] = useState("");
  const [setMsgText, setSetMsgText] = useState("");
  const [armed, setArmed] = useState(false);
  const [shake, setShake] = useState(false);

  const pending = useRef<number | null>(null);
  const aptRef = useRef<HTMLInputElement>(null);
  // O nhap so luong trong phan Cai dat: giu rieng de con so dang go khong
  // dap vao quy giai that truoc khi bam Luu.
  const [qtyDraft, setQtyDraft] = useState<Record<number, string>>({});

  // ----- Doc du lieu da luu -----
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as State;
        if (Array.isArray(s?.pool) && Array.isArray(s?.log)) setState(s);
      }
    } catch {
      /* trinh duyet chan localStorage -> chay voi quy giai moi */
    }
    setLoaded(true);
  }, []);

  // ----- Ghi lai moi khi doi -----
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* het dung luong hoac bi chan -> van chay duoc trong phien nay */
    }
  }, [state, loaded]);

  const left = state.pool.reduce((s, p) => s + p.left, 0);
  const awarded = state.log.reduce((s, l) => s + l.value, 0);

  // ----- Kiem tra can ho / sdt da quay chua -----
  const key = aptKey(apt);
  const dup = key ? state.log.find((l) => l.key === key) : undefined;
  const digits = phone.replace(/\D/g, "");
  const dupPhone =
    !dup && digits.length >= 9
      ? state.log.find((l) => l.phone === digits)
      : undefined;

  const blocked = !!dup || left === 0 || spinning;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (spinning) return;
    if (!apt.trim()) {
      setMsg("Nhập số căn hộ.");
      return;
    }
    if (dup) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      aptRef.current?.focus();
      return;
    }
    if (digits.length < 9 || digits.length > 11) {
      setMsg("Số điện thoại chưa đúng.");
      return;
    }
    if (left === 0) {
      setMsg("Đã hết quỹ giải của chung cư này.");
      return;
    }
    setMsg("");

    // Rut theo so luong CON LAI -> giai het thi khong the ra nua
    const r = Math.random() * left;
    let acc = 0;
    let i = state.pool.findIndex((p) => p.left > 0);
    for (let k = 0; k < state.pool.length; k++) {
      acc += state.pool[k].left;
      if (r < acc) {
        i = k;
        break;
      }
    }
    pending.current = i;
    setSpinning(true);
    setRotation((rot) => spinAngle(rot, i, state.pool.length));
  };

  const onSpinEnd = () => {
    const i = pending.current;
    pending.current = null;
    setSpinning(false);
    if (i === null) return;

    const aptClean = apt.trim().toUpperCase().replace(/\s+/g, " ");
    const now = new Date();
    const entry: LogEntry = {
      time:
        now.toLocaleDateString("vi-VN") +
        " " +
        now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      apt: aptClean,
      key: aptKey(aptClean),
      name: name.trim(),
      phone: digits,
      prize: state.pool[i].name,
      value: state.pool[i].value,
    };

    setWon({ prize: state.pool[i], apt: aptClean });
    setState((s) => ({
      pool: s.pool.map((p, k) => (k === i ? { ...p, left: p.left - 1 } : p)),
      log: [...s.log, entry],
    }));
    setApt("");
    setName("");
    setPhone("");
  };

  const copyLog = async () => {
    const rows = [
      ["Thời gian", "Căn hộ", "Tên khách", "SĐT", "Giải", "Giá trị (đ)"],
      ...state.log.map((l) => [l.time, l.apt, l.name, l.phone, l.prize, l.value]),
    ];
    const tsv = rows.map((r) => r.join("\t")).join("\n");
    try {
      await navigator.clipboard.writeText(tsv);
      setCopyMsg(`Đã sao chép ${state.log.length} dòng. Dán vào Excel.`);
    } catch {
      setCopyMsg("Trình duyệt chặn sao chép. Bôi đen bảng rồi Ctrl+C.");
    }
  };

  const saveQty = () => {
    // Tinh trucc tiep tren state cua lan render nay. Khong tinh ben trong
    // ham cap nhat cua setState: ham do chay SAU, nen thong bao se sai.
    let allOk = true;
    const pool = state.pool.map((p, i) => {
      const raw = qtyDraft[i];
      if (raw === undefined) return p;
      const q = Math.max(0, Math.floor(Number(raw) || 0));
      const used = state.log.filter((l) => l.prize === p.name).length;
      if (q < used) {
        allOk = false;
        return p;
      }
      return { ...p, quantity: q, left: q - used };
    });
    setState((s) => ({ ...s, pool }));
    // Xoa ban nhap -> o nhap quay ve dung con so that sau khi luu,
    // ke ca nhung o vua bi tu choi.
    setQtyDraft({});
    setSetMsgText(
      allOk
        ? "Đã lưu quỹ giải."
        : "Có giải nhập nhỏ hơn số đã trao nên giữ nguyên."
    );
  };

  const resetAll = () => {
    if (!armed) {
      setArmed(true);
      setSetMsgText("Hãy sao chép nhật ký trước khi xóa. Bấm lần nữa để xác nhận.");
      setTimeout(() => setArmed(false), 5000);
      return;
    }
    setState((s) => ({
      pool: s.pool.map((p) => ({ ...p, left: p.quantity })),
      log: [],
    }));
    setArmed(false);
    setSetMsgText("Đã bắt đầu quỹ giải mới.");
  };

  const dimmed = state.pool
    .map((p, i) => (p.left === 0 ? i : -1))
    .filter((i) => i >= 0);

  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <PrizeWheel
          prizes={state.pool}
          rotation={rotation}
          dimmed={dimmed}
          onSpinEnd={onSpinEnd}
        />

        <form
          onSubmit={onSubmit}
          autoComplete="off"
          className="rounded-lg border border-line bg-surface p-6 sm:p-8"
        >
          <h2 className="text-2xl">Thông tin lượt quay</h2>

          <label
            htmlFor="apt"
            className="mt-5 block font-display text-sm font-semibold"
          >
            Số căn hộ *
          </label>
          <input
            id="apt"
            ref={aptRef}
            value={apt}
            onChange={(e) => setApt(e.target.value)}
            placeholder="VD: S6.02-1205"
            required
            className={`mt-1.5 min-h-12 w-full rounded-md border bg-canvas px-3 py-2.5 text-base
              focus:ring-2 focus:ring-accent-bright focus:outline-none
              ${dup ? "border-2 border-danger bg-danger/5" : "border-line"}
              ${shake ? "animate-pulse" : ""}`}
          />

          {dup ? (
            <div
              role="alert"
              className="mt-2 rounded-md bg-danger p-3 text-sm font-semibold text-white"
            >
              ⚠ Căn {dup.apt} ĐÃ QUAY RỒI – không được quay lần 2.
              <span className="mt-1 block text-xs font-normal opacity-95">
                Đã quay lúc {dup.time}
                {dup.name ? ` · ${dup.name}` : ""} · trúng: {dup.prize}
              </span>
            </div>
          ) : dupPhone ? (
            <div
              role="alert"
              className="mt-2 rounded-md bg-[#f5a524] p-3 text-sm font-semibold text-ink"
            >
              Lưu ý: SĐT này đã quay cho căn {dupPhone.apt}. Kiểm tra lại có
              đúng là căn khác không.
              <span className="mt-1 block text-xs font-normal">
                Mỗi căn hộ chỉ 1 lượt; một người có 2 căn cần xuất trình giấy tờ
                căn thứ hai.
              </span>
            </div>
          ) : null}

          <label
            htmlFor="cust"
            className="mt-4 block font-display text-sm font-semibold"
          >
            Tên khách
          </label>
          <input
            id="cust"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Chị Lan"
            className="mt-1.5 min-h-12 w-full rounded-md border border-line bg-canvas px-3 py-2.5 text-base focus:ring-2 focus:ring-accent-bright focus:outline-none"
          />

          <label
            htmlFor="tel"
            className="mt-4 block font-display text-sm font-semibold"
          >
            Số điện thoại *
          </label>
          <input
            id="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            placeholder="VD: 0901234567"
            required
            className="mt-1.5 min-h-12 w-full rounded-md border border-line bg-canvas px-3 py-2.5 text-base focus:ring-2 focus:ring-accent-bright focus:outline-none"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-6 w-full"
            disabled={blocked}
          >
            {spinning ? "Đang quay…" : "QUAY NGAY"}
          </Button>

          <p className="mt-2 min-h-5 text-sm text-danger" role="status">
            {left === 0 ? "Đã hết quỹ giải của chung cư này." : msg}
          </p>

          <p className="mt-3 text-sm text-muted-fg">
            Giải rút từ quỹ giải cố định của tòa, giải nào hết sẽ không ra nữa.
            Mỗi căn hộ chỉ quay 1 lần: gõ số căn đã quay sẽ báo đỏ ngay và khóa
            nút quay.
          </p>
        </form>
      </div>

      {/* ---------- So lieu ---------- */}
      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {[
          { v: fmt(left), l: "lượt giải còn lại" },
          { v: fmt(state.log.length), l: "giải đã trao" },
          { v: fmt(awarded), l: "giá trị đã trao (đ)" },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded-lg border border-line bg-surface p-5"
          >
            <b className="tabular block font-display text-[clamp(1.5rem,3vw,2rem)] leading-none font-bold">
              {k.v}
            </b>
            <span className="mt-1 block text-sm text-muted-fg">{k.l}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* ---------- Quy giai con lai ---------- */}
        <div className="rounded-lg border border-line bg-surface p-6">
          <h2 className="text-xl">Quỹ giải còn lại</h2>
          <div className="mt-4 grid gap-3">
            {state.pool.map((p) => (
              <div key={p.name}>
                <div className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 rounded-sm"
                    style={{ background: p.color }}
                  />
                  <span className="min-w-0 flex-1 text-sm">{p.name}</span>
                  <span className="tabular shrink-0 text-sm text-muted-fg">
                    {p.left}/{p.quantity}
                  </span>
                </div>
                <div className="mt-1.5 ml-6 h-2 overflow-hidden rounded-full bg-line">
                  <i
                    className="block h-full bg-accent"
                    style={{
                      width: `${p.quantity ? (p.left / p.quantity) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Nhat ky ---------- */}
        <div className="rounded-lg border border-line bg-surface p-6">
          <h2 className="text-xl">Nhật ký trúng thưởng</h2>
          <div className="mt-4 max-h-[26rem] overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="py-2 pr-2 font-display">Giờ</th>
                  <th className="py-2 pr-2 font-display">Căn</th>
                  <th className="py-2 pr-2 font-display">Khách</th>
                  <th className="py-2 pr-2 font-display">Giải</th>
                  <th className="tabular py-2 text-right font-display">
                    Giá trị (đ)
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.log.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-muted-fg">
                      Chưa có lượt quay nào.
                    </td>
                  </tr>
                ) : (
                  state.log
                    .slice()
                    .reverse()
                    .map((l, i) => (
                      <tr key={`${l.key}-${i}`} className="border-b border-line">
                        <td className="tabular py-2 pr-2 align-top whitespace-nowrap">
                          {l.time}
                        </td>
                        <td className="py-2 pr-2 align-top">{l.apt}</td>
                        <td className="py-2 pr-2 align-top">
                          {l.name}
                          <span className="tabular block text-muted-fg">
                            {l.phone.slice(0, 3)}****{l.phone.slice(-3)}
                          </span>
                        </td>
                        <td className="py-2 pr-2 align-top">{l.prize}</td>
                        <td className="tabular py-2 text-right align-top whitespace-nowrap">
                          {fmt(l.value)}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={copyLog}>
              Sao chép nhật ký (dán vào Excel)
            </Button>
          </div>
          <p className="mt-2 min-h-5 text-sm text-muted-fg" role="status">
            {copyMsg}
          </p>
        </div>
      </div>

      {/* ---------- Cai dat quy giai ---------- */}
      <details className="mt-8 rounded-lg border border-line bg-surface p-6">
        <summary className="cursor-pointer font-display font-semibold">
          Cài đặt quỹ giải (chỉ nhân viên K3)
        </summary>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-2 pr-2 font-display">Giải</th>
                <th className="py-2 pr-2 text-right font-display">
                  Giá trị (đ)
                </th>
                <th className="py-2 text-right font-display">
                  Số lượng ban đầu
                </th>
              </tr>
            </thead>
            <tbody>
              {state.pool.map((p, i) => (
                <tr key={p.name} className="border-b border-line">
                  <td className="py-2 pr-2">{p.name}</td>
                  <td className="tabular py-2 pr-2 text-right">
                    {fmt(p.value)}
                  </td>
                  <td className="py-2 text-right">
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={qtyDraft[i] ?? String(p.quantity)}
                      aria-label={`Số lượng ${p.name}`}
                      onChange={(e) =>
                        setQtyDraft((d) => ({ ...d, [i]: e.target.value }))
                      }
                      className="min-h-10 w-28 rounded-md border border-line bg-canvas px-2 py-1.5 text-right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={saveQty}>
            Lưu số lượng
          </Button>
          <Button variant="secondary" onClick={resetAll}>
            {armed
              ? "Bấm lần nữa để xác nhận xóa"
              : "Xóa nhật ký, bắt đầu chung cư mới"}
          </Button>
        </div>
        <p className="mt-2 min-h-5 text-sm text-muted-fg" role="status">
          {setMsgText}
        </p>
        <p className="mt-3 text-sm text-muted-fg">
          Dữ liệu lưu trên trình duyệt của máy đang trực booth. Đổi máy hoặc xóa
          dữ liệu duyệt web là mất nhật ký. Cuối mỗi buổi bấm “Sao chép nhật ký”
          và dán vào sheet theo dõi để làm biên bản trao giải.
        </p>
      </details>

      {/* ---------- Thong bao trung giai ---------- */}
      {won ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-deep/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="won-title"
        >
          <div className="w-full max-w-md rounded-xl border-t-8 border-t-cta bg-surface p-7 text-center">
            <h3 id="won-title" className="font-display text-base text-muted-fg">
              Chúc mừng căn hộ {won.apt}
            </h3>
            <p className="mt-2 font-display text-[clamp(1.4rem,4vw,1.9rem)] leading-tight font-bold">
              {won.prize.name}
            </p>
            <p className="tabular mt-2 text-lg">
              Trị giá {fmt(won.prize.value)} đ
            </p>
            <Button
              variant="primary"
              size="lg"
              className="mt-6 w-full"
              onClick={() => {
                setWon(null);
                aptRef.current?.focus();
              }}
            >
              Ghi nhận và tiếp tục
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
