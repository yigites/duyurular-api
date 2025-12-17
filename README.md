# Multi Duyurular API

Bu proje GİB, SGK ve TÜRMOB duyuru API'lerini tek bir altyapıda birleştiriyor. Her bir kaynağın güncel duyurularını JSON ve RSS formatında üretmek için ortak bir `update` komutu kullanılır.

## Yayınlanan beslemeler (varsayılan GitHub Pages URL'i değiştirilebilir)
- GİB JSON: `https://KULLANICIADI.github.io/multi-duyurular-api/data/gib.json`
- GİB RSS: `https://KULLANICIADI.github.io/multi-duyurular-api/gib/rss.xml`
- SGK JSON: `https://KULLANICIADI.github.io/multi-duyurular-api/data/sgk.json`
- SGK RSS: `https://KULLANICIADI.github.io/multi-duyurular-api/sgk/rss.xml`
- TÜRMOB JSON: `https://KULLANICIADI.github.io/multi-duyurular-api/data/turmob.json`
- TÜRMOB RSS: `https://KULLANICIADI.github.io/multi-duyurular-api/turmob/rss.xml`

## Kurulum ve güncelleme

1. Bağımlılıkları kurun:
   ```bash
   npm install
   ```
2. `src/config.js` içindeki `PUBLIC_BASE_URL` değerini kendi barındırma adresinize göre değiştirin.
3. Güncel veriyi almak ve RSS oluşturmak için:
   ```bash
   npm run update
   ```

`npm run update` sırasıyla her kaynağın scraper'ını çalıştırır, `data/` dizinine JSON dosyalarını yazar ve her kaynağın RSS beslemesini `public/<id>/rss.xml` altına üretir.

## İçerik

- `scripts/update.js`: Tüm kaynağın scraper'ını çalıştırıp data ve RSS dosyalarını üreten script.
- `src/scrapers/`: GİB, SGK, TÜRMOB için ayrı scraper modülleri.
- `src/rss.js`: Ortak RSS üretici yardımcı.
- `src/utils/date.js`: İnternetten gelen tarihleri ISO 8601 biçimine dönüştüren yardımcı.
- `data/`: Her bir kaynağın güncel duyurularını tutan JSON dosyaları.
- `public/`: İsteklere cevap verecek RSS dosyaları.

## Yayınlama

Bu dizini GitHub Pages (veya başka bir statik host) ile yayınlarsanız yukarıdaki JSON/RSS URL'leri aktif olur. GitHub Actions veya başka bir CI mekanizmasıyla `npm run update` komutunu düzenli çağırabilirsiniz.
