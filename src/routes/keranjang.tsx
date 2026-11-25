import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getProduct, formatRupiah, STORE_NAME } from "@/lib/store";

export const Route = createFileRoute("/keranjang")({
  head: () => ({
    meta: [
      { title: `Keranjang — ${STORE_NAME}` },
      { name: "description", content: "Lihat dan atur pakaian di keranjang belanja Anda." },
      { property: "og:title", content: `Keranjang — ${STORE_NAME}` },
      { property: "og:description", content: "Keranjang belanja Anda." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();
  if (items.length === 0)
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Keranjang masih kosong</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-primary-foreground">Mulai Belanja</Link>
      </div>
    );
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-[1fr_320px]">
      <div>
        <h1 className="font-display text-4xl">Keranjang</h1>
        <ul className="mt-6 divide-y divide-border">
          {items.map((i) => {
            const p = getProduct(i.id);
            if (!p) return null;
            return (
              <li key={i.id + i.size} className="flex gap-4 py-5">
                <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-24 w-24 rounded-xl bg-secondary object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-muted-foreground">Ukuran: {i.size}</p>
                  <div className="mt-2 inline-flex items-center rounded-full border border-border text-sm">
                    <button aria-label="Kurangi" onClick={() => setQty(i.id, i.size, i.qty - 1)} className="px-3 py-1">−</button>
                    <span className="w-6 text-center">{i.qty}</span>
                    <button aria-label="Tambah" onClick={() => setQty(i.id, i.size, i.qty + 1)} className="px-3 py-1">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <p>{formatRupiah(p.price * i.qty)}</p>
                  <button aria-label="Hapus" onClick={() => remove(i.id, i.size)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <aside className="h-fit rounded-2xl bg-secondary p-6">
        <p className="text-sm text-muted-foreground">Subtotal</p>
        <p className="font-display text-3xl">{formatRupiah(total)}</p>
        <p className="mt-2 text-xs text-muted-foreground">Ongkir dikonfirmasi lewat WhatsApp.</p>
        <Link to="/checkout" className="mt-6 block rounded-full bg-primary py-3 text-center text-primary-foreground shadow-warm">Lanjut ke Checkout</Link>
      </aside>
    </div>
  );
}
