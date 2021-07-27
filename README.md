# Stand With Dorayaki - Frontend

> Repositori ini untuk frontend, backend di [sini](https://github.com/raf555/standwithdorayaki-backend).

## Scripts

Script serbaguna untuk keperluan project.

### `npm run dev`

Untuk menjalankan aplikasi dalam mode *development*.

### `npm run build`

Untuk mem-build aplikasi menjadi file *static* untuk dijalankan pada mode *production*.

## Cara Pakai

Fitur-fitur yang ada pada aplikasi ini sangat *straightforward* sehingga pasti dapat langsung dipahami saat menggunakan aplikasi.

Untuk development, aplikasi dapat dibuka melalui peramban dengan alamat situs `http://localhost:8080/`

### Fitur yang ada

1. Menambah/menghapus dorayaki yang ada
2. Menambah/menghapus toko yang ada
3. Menambah/menghapus stok dorayaki pada suatu toko
4. Memindahkan stok dorayaki dari suatu ke toko ke toko lainnya
5. Melihat stok dorayaki pada suatu toko
6. Mencari toko berdasarkan nama/jalan/alamat/provinsi
7. Mencari dorayaki berdasarkan rasa

## Tambahan

### Konsep Aplikasi

Konsep aplikasi ini adalah sebuah *dashboard* admin sederhana untuk mengatur Toko. Sebelum menggunakan aplikasi, pengguna akan diminta untuk login ke Toko tertentu. Sehingga, konteks aplikasi yang berjalan adalah sesuai Toko yang digunakan tadi. Kemudian Toko yang tadi dapat dilakukan perubahan-perubahan seperti mengubah data/menghapus toko, menambah/mengurang/men-transfer dorayaki, dan lain-lain.

### Framework dan Library

1. Framework yang digunakan adalah **Svelte** dengan Library styling kombinasi dari [Svelte Carbon](https://carbon-svelte.vercel.app/) dan [Svelte Materialify](https://svelte-materialify.vercel.app/).

2. Library untuk request menggunakan **Axios**.

### Routing

1. Routing pada aplikasi ini menggunakan Library `svelte-spa-router` yang berbasis HashRouter.

### Bundling

1. Bundling aplikasi dan menjadikannya *static* menggunakan library Webpack.
