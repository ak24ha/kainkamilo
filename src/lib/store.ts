import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export const STORE_NAME = "Kain Kita";
// Ganti dengan nomor WhatsApp toko (format internasional tanpa +)
export const WHATSAPP_NUMBER = "6281234567890";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  { id: "kemeja-linen", name: "Kemeja Linen Krem", category: "Atasan", price: 249000, image: p1, description: "Kemeja linen ringan dan adem, cocok untuk cuaca tropis. Potongan santai dengan saku dada.", sizes: ["S", "M", "L", "XL"] },
  { id: "dress-batik", name: "Dress Batik Terakota", category: "Dress", price: 329000, image: p2, description: "Dress katun motif batik cap dengan warna terakota hangat. Nyaman dipakai seharian.", sizes: ["S", "M", "L"] },
  { id: "kaos-oversize", name: "Kaos Oversize Zaitun", category: "Atasan", price: 139000, image: p3, description: "Kaos katun combed 24s tebal, potongan oversize yang santai.", sizes: ["M", "L", "XL", "XXL"] },
  { id: "celana-kulot", name: "Celana Kulot Linen Cokelat", category: "Bawahan", price: 279000, image: p4, description: "Celana kulot lebar berbahan linen, pinggang tinggi dengan lipit depan.", sizes: ["S", "M", "L", "XL"] },
  { id: "kardigan-rajut", name: "Kardigan Rajut Mustard", category: "Luaran", price: 299000, image: p5, description: "Kardigan rajut lembut dengan kancing kayu. Hangat tapi tidak gerah.", sizes: ["All size"] },
  { id: "hijab-voal", name: "Hijab Voal Navy", category: "Aksesoris", price: 89000, image: p6, description: "Hijab segi empat voal premium, mudah dibentuk dan tidak licin.", sizes: ["115 x 115 cm"] },
];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const getProduct = (id: string) => products.find((p) => p.id === id);
