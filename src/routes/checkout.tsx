import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, formatRupiah, STORE_NAME, WHATSAPP_NUMBER } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: `Checkout — ${STORE_NAME}` },
      { name: "description", content: "Isi data pengiriman dan kirim pesanan lewat WhatsApp." },
      { property: "og:title", content: `Checkout — ${STORE_NAME}` },
      { property: "og:description", content: "Kirim pesanan lewat WhatsApp." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ nama: "", hp: "", alamat: "", kota: "", catatan: "", bayar: "Transfer Bank" });
  const [sent, setSent] = useState(false);

  if (sent)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Terima kasih!</h1>
        <p className="mt-3 text-muted-foreground">Pesanan Anda sudah dikirim ke WhatsApp kami. Kami akan segera membalas dengan total ongkir dan cara pembayaran.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-primary-foreground">Kembali Belanja</Link>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Belum ada barang untuk di-checkout</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-primary-foreground">Mulai Belanja</Link>
      </div>
    );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const lines = items.map((i, n) => {
      const p = getProduct(i.id);
      return `${n + 1}. ${p?.name} (${i.size}) x${i.qty} = ${formatRupiah((p?.price ?? 0) * i.qty)}`;
    });
    const msg = [
      `Halo ${STORE_NAME}, saya ingin memesan:`,
      "",
      ...lines,
      "",
      `*Total: ${formatRupiah(total)}* (belum termasuk ongkir)`,
      "",
      `Nama: ${form.nama}`,
      `No. HP: ${form.hp}`,
      `Alamat: ${form.alamat}, ${form.kota}`,
      `Pembayaran: ${form.bayar}`,
      form.catatan ? `Catatan: ${form.catatan}` : "",
    ].filter((l, idx, arr) => !(l === "" && idx === arr.length - 1)).join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    clear();
    setSent(true);
  };

  const field = "mt-1 w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:border-primary";
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-[1fr_360px]">
      <form onSubmit={submit} className="space-y-4">
        <h1 className="font-display text-4xl">Checkout</h1>
        <label className="block text-sm">Nama lengkap<input required maxLength={100} value={form.nama} onChange={set("nama")} className={field} /></label>
        <label className="block text-sm">No. HP / WhatsApp<input required type="tel" pattern="[0-9+ ]{8,16}" value={form.hp} onChange={set("hp")} className={field} /></label>
        <label className="block text-sm">Alamat lengkap<textarea required maxLength={300} rows={3} value={form.alamat} onChange={set("alamat")} className={field} /></label>
        <label className="block text-sm">Kota / Kecamatan<input required maxLength={100} value={form.kota} onChange={set("kota")} className={field} /></label>
        <label className="block text-sm">Metode pembayaran
          <select value={form.bayar} onChange={set("bayar")} className={field}>
            <option>Transfer Bank</option><option>E-Wallet (OVO/GoPay/DANA)</option><option>COD (Bayar di Tempat)</option>
          </select>
        </label>
        <label className="block text-sm">Catatan (opsional)<textarea maxLength={300} rows={2} value={form.catatan} onChange={set("catatan")} className={field} /></label>
        <button type="submit" className="w-full rounded-full bg-whatsapp py-4 font-medium text-whatsapp-foreground shadow-warm">Pesan via WhatsApp</button>
      </form>
      <aside className="h-fit rounded-2xl bg-secondary p-6">
        <h2 className="font-display text-xl">Ringkasan Pesanan</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((i) => {
            const p = getProduct(i.id);
            return <li key={i.id + i.size} className="flex justify-between gap-3"><span>{p?.name} ({i.size}) ×{i.qty}</span><span>{formatRupiah((p?.price ?? 0) * i.qty)}</span></li>;
          })}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4 font-medium"><span>Total</span><span>{formatRupiah(total)}</span></div>
        <p className="mt-2 text-xs text-muted-foreground">Ongkir akan diinformasikan admin lewat WhatsApp.</p>
      </aside>
    </div>
  );
}
