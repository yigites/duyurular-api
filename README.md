# Duyurular API

Bu proje GİB, SGK ve TÜRMOB duyuru kaynaklarını tek bir altyapıda birleştirerek hem JSON hem RSS formatlarında güncel beslemeleri üretir. Ortak `update` komutu her kaynağın scraper'ını çalıştırır, `data/` altına JSON yazar ve `public/<id>/rss.xml` altında RSS dosyalarını oluşturur.

## Yayınlanan beslemeler (varsayılan GitHub Pages URL'i değiştirilebilir)

Aşağıdaki tabloda GitHub Pages üzerinde erişilebilecek beslemeler yer alır. Gerçek kullanıcı adınızı `KULLANICIADI` yerine yazabilir veya `src/config.js` içindeki `PUBLIC_BASE_URL` değerini kendi barındırma adresinize göre güncelleyebilirsiniz.

| Kaynak | JSON | RSS |
| --- | --- | --- |
| GİB | `https://KULLANICIADI.github.io/multi-duyurular-api/data/gib.json` | `https://KULLANICIADI.github.io/multi-duyurular-api/gib/rss.xml` |
| SGK | `https://KULLANICIADI.github.io/multi-duyurular-api/data/sgk.json` | `https://KULLANICIADI.github.io/multi-duyurular-api/sgk/rss.xml` |
| TÜRMOB | `https://KULLANICIADI.github.io/multi-duyurular-api/data/turmob.json` | `https://KULLANICIADI.github.io/multi-duyurular-api/turmob/rss.xml` |

## Kurulum ve güncelleme

1. Bağımlılıkları kurun:
   ```bash
   npm install
   ```
2. `src/config.js` içinde `PUBLIC_BASE_URL` değerini kendi barındırma adresinizle eşleştirin.
3. Güncel veriyi çekmek ve RSS üretmek için:
   ```bash
   npm run update
   ```

`npm run update`, sırasıyla tüm scraper'ları çalıştırır, `data/` dizinine JSON dosyalarını kaydeder ve `public/<id>/rss.xml` altına RSS beslemelerini üretir.

## Proje yapısı

- `scripts/update.js`: Her kaynağın scraper'ını çalıştırıp data ile RSS dosyalarını oluşturan script.
- `src/scrapers/`: GİB, SGK ve TÜRMOB için ayrı scraper modülleri.
- `src/rss.js`: Ortak RSS üretici yardımcı fonksiyonları.
- `src/utils/date.js`: İnternetten gelen tarihleri ISO 8601 biçimine çeviren araçlar.
- `data/`: Her kaynağın güncel duyurularını JSON olarak saklayan dizin.
- `public/`: Yayınlanacak RSS dosyalarının yer aldığı dizin.

## JSON çıktıları

JSON verileri `data/<kaynak>.json` dosyalarında tutulur ve her duyuru nesnesi şu alanları içerir:

- `title`: Duyuru başlığı.
- `link`: Orijinal duyuru sayfasına bağlantı.
- `date`: ISO 8601 biçiminde tarih (`YYYY-MM-DD`).
- `category`: Kaynağın duyuru kategorisi.
- `source`: Duyurunun yayınlandığı alan adı.

Örnek bir JSON girdisi:

```json
{
  "title": "Aylık Değerlendirme Toplantımızı Gerçekleştirdik",
  "link": "https://www.gib.gov.tr/duyuru-arsivi/guncel/15385_aylik_degerlendirme_toplantimizi_gerceklestirdik",
  "date": "2025-12-05",
  "category": "Güncel",
  "source": "gib.gov.tr"
}
```

## Yayınlama

Bu dizini GitHub Pages veya başka bir statik platformla yayınlarsanız yukarıdaki JSON/RSS URL'leri aktif olur. İsterseniz GitHub Actions gibi bir CI mekanizmasıyla `npm run update` komutunu düzenli olarak çalıştırabilirsiniz.


---

## ⚖️ Yasal Uyarı / Disclaimer

Bu proje, kamuya açık duyuru kaynaklarını (GİB, SGK, TÜRMOB) tek bir merkezden takip edebilmek amacıyla geliştirilmiş **gayri resmi (unofficial)** bir araçtır.

* **Veri Sahipliği:** Çekilen tüm veriler (başlık, içerik, görseller vb.) ilgili kurumların (Gelir İdaresi Başkanlığı, Sosyal Güvenlik Kurumu, TÜRMOB) mülkiyetindedir. Bu proje, çekilen veriler üzerinde herhangi bir hak iddia etmez.
* **Sorumluluk Reddi:** Veriler, ilgili kurumların web sitelerinden otomatik (scraping) yöntemlerle alınmaktadır. Verilerin güncelliği, doğruluğu veya sistemdeki gecikmelerden dolayı oluşabilecek hatalardan bu yazılım ve geliştiricisi sorumlu tutulamaz. Kritik kararlar ve işlemler için her zaman resmi kurumların kendi web sayfaları (`link` alanında belirtilen orijinal adresler) teyit edilmelidir.
* **Kullanım Koşulları:** Bu projeyi kullanan kişiler, hedef sitelerin kullanım koşullarına ve robot.txt kurallarına uymakla yükümlüdür. Sistemin aşırı sorgu ile yorulması veya verilerin izinsiz ticari kullanımı durumunda tüm sorumluluk son kullanıcıya aittir.
* **Atıf:** Proje çıktıları içerisinde her haberin orijinal kaynağına yer verilmiştir. Bu bağlantıların korunması ve son kullanıcıya gösterilmesi, ilgili kurumlara trafik yönlendirilmesi açısından önem arz etmektedir.

---

### 🌍 English Version

This is an **unofficial** data aggregation tool.

* **Data Ownership:** All data belongs to the respective official institutions (GİB, SGK, TÜRMOB).
* **No Warranty:** The developer does not guarantee the accuracy or timeliness of the information. Always verify information through official government websites.
* **Liability:** Use of this tool is at your own risk. The developer is not responsible for any misuse or damages resulting from the use of this software.