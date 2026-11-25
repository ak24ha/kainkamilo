import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { STORE_NAME } from "@/lib/store";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-2xl tracking-tight">{STORE_NAME}</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" hash="koleksi" className="hidden sm:inline hover:text-primary">Koleksi</Link>
          <Link to="/keranjang" className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground">
            <ShoppingBag className="h-4 w-4" /> Keranjang
            {count > 0 && <span className="rounded-full bg-background px-2 text-xs font-semibold text-foreground">{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted-foreground">
        <p className="font-display text-lg text-foreground">{STORE_NAME}</p>
        <p className="mt-1">Pakaian lokal yang nyaman untuk keseharian. Pemesanan via WhatsApp.</p>
      </div>
    </footer>
  );
}
