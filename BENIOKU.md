# sayim.novaart3d.com — Nova indirme ve etiket sayfası

Etiketteki QR (`https://sayim.novaart3d.com/d/DLR/DMB-00001`) telefonun kamerasıyla okutulunca:
uygulama yüklüyse **doğrudan Nova açılır** ve demirbaşın yeri gösterilir; yüklü değilse `d.html` (indirme) açılır.
Bu sitede müşteri verisi yoktur; uygulama bilgiyi işletmenin kendi sunucusundan alır. Tüm müşteriler için tek adres.

## 1. Alt alan adı (Natro, bir kez)
1. Natro paneli › cPanel › **Alt Alan Adları** › `sayim` (kök: `novaart3d.com`) oluşturun.
2. **SSL/TLS Durumu** › AutoSSL ile `sayim.novaart3d.com` için ücretsiz sertifika verin (HTTPS zorunlu).
3. Bu klasördeki her şeyi alt alan adının kök klasörüne yükleyin (`.htaccess` ve `.well-known` gizli dosyalar dahil).
4. Kontrol: `https://sayim.novaart3d.com/.well-known/assetlinks.json` tarayıcıda JSON olarak açılmalı.

## 2. Android (App Links)
APK hangi anahtarla imzalanıyorsa onun SHA-256 parmak izi `assetlinks.json`'a yazılır:
```
keytool -list -v -keystore novasayim.keystore -alias novasayim
```
Çıktıdaki `SHA256:` satırını (AA:BB:… biçiminde) `sha256_cert_fingerprints` içine yazın.
Google Play'e de koyarsanız Play Console › Uygulama imzalama sayfasındaki SHA-256'yı da ekleyin (ikisi birlikte kalabilir).

## 3. iPhone (Universal Links)
- Apple Developer hesabı gerekir. **Membership** sayfasındaki 10 karakterlik **Team ID**'yi `apple-app-site-association` içindeki `TEAMID` yerine yazın.
- Developer hesabında App ID `com.novaart3d.novasayim` için **Associated Domains** özelliğini açın.
- Uygulama yayın (Release) derlemesinde `Platforms/iOS/Entitlements.Yayin.plist` ile imzalanır.

## 4. İndirme dosyaları
Bağlantılar her yayında kendiliğinden güncellenir: `yayinla.ps1` Cloudflare R2’ye (indir.novaart3d.com) `son.js` yükler, sayfa açılışta onu okur. `yapilandirma.js`’deki adresler yalnızca `son.js` okunamazsa kullanılır; App Store bağlantısı alınca oraya yazın.

Not: Alan adı değişirse `EtiketBaglantisi.WebAlanAdi` (Shared), `Entitlements.Yayin.plist` ve bu dosyalar birlikte değişmelidir.
Programda **Ayarlar › Genel Ayarlar › Etiket QR bağlantısı › Web bağlantısı** seçilince yeni etiketler bu adresle basılır.
