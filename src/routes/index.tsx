import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products, formatRupiah, STORE_NAME } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${STORE_NAME} — Pakaian Lokal Nyaman` },
      { name: "description", content: "Belanja kemeja linen, dress batik, kaos, dan hijab. Pesan mudah lewat WhatsApp." },
      { property: "og:title", content: `${STORE_NAME} — Pakaian Lokal Nyaman` },
      { property: "og:description", content: "Belanja pakaian lokal dan pesan mudah lewat WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Koleksi Terbaru</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">Pakaian sederhana, nyaman setiap hari.</h1>
          <p className="mt-5 max-w-md text-muted-foreground">Bahan linen dan katun pilihan, dijahit oleh penjahit lokal. Pilih, masukkan keranjang, lalu pesan lewat WhatsApp.</p>
          <a href="#koleksi" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-primary-foreground shadow-warm transition hover:-translate-y-0.5">Lihat Koleksi</a>
        </div>
        <img src={hero} alt="Model memakai kemeja linen terakota" width={1600} height={1008} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-warm" />
      </section>

      <section id="koleksi" className="mx-auto max-w-6xl scroll-mt-24 px-5">
        <h2 className="font-display text-3xl">Koleksi Kami</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3">
          {products.map((p) => (
            <Link key={p.id} to="/produk/$id" params={{ id: p.id }} className="group">
              <div className="overflow-hidden rounded-2xl bg-secondary">
                <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{p.category}</p>
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-primary">{formatRupiah(p.price)}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
