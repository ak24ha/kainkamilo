# Kain Kita

Toko pakaian online: katalog produk, keranjang, checkout, dan pesanan masuk ke WhatsApp.

Dibangun dengan [Lovable](https://lovable.dev).

## Alur pesanan

1. Pembeli memilih produk, ukuran, dan jumlah.
2. Barang masuk ke keranjang.
3. Checkout mengisi nama, alamat, dan metode pembayaran.
4. Tombol "Pesan via WhatsApp" membuka WhatsApp ke nomor toko dengan isi pesanan lengkap.

## Struktur penting

| File | Isi |
| --- | --- |
| `src/routes/index.tsx` | Beranda dan daftar produk |
| `src/routes/produk.$id.tsx` | Halaman detail satu produk |
| `src/routes/keranjang.tsx` | Halaman keranjang |
| `src/routes/checkout.tsx` | Form checkout dan tombol WhatsApp |
| `src/lib/store.ts` | Data produk (nama, harga, ukuran, foto) |
| `src/lib/cart.tsx` | State keranjang (tambah, hapus, total) |
| `src/components/SiteHeader.tsx` | Navigasi dan jumlah item keranjang |

Ganti nomor WhatsApp dan data produk di `src/lib/store.ts`.

## Development

Butuh Node.js dan npm — [install dengan nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <url-repository-anda>
cd <nama-repository>
npm i
npm run dev
```

Perintah lain:

```sh
npm run test     # jalankan tes
npm run lint     # cek gaya kode
npm run build    # build produksi
```

## Sinkron dengan Lovable

Perubahan yang di-push ke `main` otomatis masuk ke Lovable, dan sebaliknya. Lanjutkan develop di [editor Lovable](https://lovable.dev/projects/ef89efa3-54a8-46c0-8431-f3f0677b171b).
