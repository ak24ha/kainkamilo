import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { getProduct, formatRupiah, STORE_NAME } from "@/lib/store";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/produk/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ${STORE_NAME}` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — ${STORE_NAME}` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-20 text-center">
      <p>Produk tidak ditemukan.</p>
      <Link to="/" className="text-primary underline">Kembali ke toko</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    add(product.id, size, qty);
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2">
      <img src={product.image} alt={product.name} width={1024} height={1024} className="aspect-square w-full rounded-3xl bg-secondary object-cover" />
      <div>
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Kembali</Link>
        <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <h1 className="font-display text-4xl">{product.name}</h1>
        <p className="mt-2 text-2xl text-primary">{formatRupiah(product.price)}</p>
        <p className="mt-5 text-muted-foreground">{product.description}</p>

        <p className="mt-8 text-sm font-medium">Ukuran</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button key={s} onClick={() => setSize(s)} className={`rounded-full border px-4 py-2 text-sm transition ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{s}</button>
          ))}
        </div>

        <p className="mt-6 text-sm font-medium">Jumlah</p>
        <div className="mt-2 inline-flex items-center rounded-full border border-border">
          <button aria-label="Kurangi" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2">−</button>
          <span className="w-8 text-center">{qty}</span>
          <button aria-label="Tambah" onClick={() => setQty((q) => q + 1)} className="px-4 py-2">+</button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={addToCart} className="rounded-full bg-primary px-7 py-3 text-primary-foreground shadow-warm">Tambah ke Keranjang</button>
          <button onClick={() => { add(product.id, size, qty); navigate({ to: "/checkout" }); }} className="rounded-full border border-primary px-7 py-3 text-primary">Beli Sekarang</button>
        </div>
      </div>
    </div>
  );
}
