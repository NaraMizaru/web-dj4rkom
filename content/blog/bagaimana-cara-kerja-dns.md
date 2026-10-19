+++
title = "Menguak Misteri Buku Telepon Internet: Bagaimana Cara Kerja DNS dan Kenapa Website Bisa Diblokir?"
date = "2026-10-19T10:25:04+07:00"

#
# description is optional
#
# description = "An optional description for SEO. If not provided, an automatically created summary will be used."

tags = ["Jaringan Komputer", "DNS", "Keamanan Jaringan", "Internet", "DNS over HTTPS"]
+++

Pernah gak sih kalian mengetik `google.com` di browser, terus dalam hitungan milidetik halamannya langsung terbuka? Atau pernah gak kalian mau membuka suatu situs, tapi yang muncul malah halaman **"Internet Positif"** atau pesan `DNS_PROBE_FINISHED_NXDOMAIN`?

Sebagai manusia, kita sangat mudah mengingat nama seperti `instagram.com` atau `youtube.com`. Tapi tahukah kamu? Komputer dan perangkat jaringan sama sekali **tidak paham** nama-nama tersebut. Komputer hanya mengerti angka-angka yang disebut **IP Address** (seperti `142.250.198.46`).

Lalu, bagaimana caranya nama domain yang kita ketik bisa terhubung ke IP Address tujuan? Jawabannya adalah **DNS (Domain Name System)**.

## Apa sih DNS itu? (Analogi Buku Telepon)

Bayangkan DNS itu seperti **buku telepon raksasa digital**.

Jika kamu ingin menelepon temanmu yang bernama Budi, kamu tidak perlu menghafal nomor HP-nya yang 12 digit itu, kan? Kamu tinggal cari nama "Budi" di kontak HP-mu, lalu tekan panggil. HP-mu secara otomatis akan menghubungkan nama "Budi" ke nomor `0812-xxxx-xxxx`.

Nah, DNS bekerja dengan cara yang persis sama:

* **Nama Kontak** = Domain Name (`google.com`)

* **Nomor HP** = IP Address (`142.250.198.46`)

Tanpa DNS, setiap kali kita mau browsing, kita harus menghafal kombinasi angka IP address dari setiap website di dunia. Bayangkan betapa pusingnya!

## **Petualangan 4 Langkah: Bagaimana DNS Bekerja?**

Saat kamu mengetik `github.com` di browser dan menekan **Enter**, terjadi komunikasi kilat antar server di seluruh dunia. Berikut adalah 4 aktor utama dan alurnya:

![4 Langkah Bagaimana Cara Kerja DNS Bekerja](/images/4-langkah-bagaimana-cara-dns-bekerja-1.jpg)

1. **DNS Recurser (DNS Resolver):**
   Laptopmu akan bertanya ke Resolver (biasanya disediakan oleh ISP seperti Indihome/Telkomsel, atau publik seperti Google `8.8.8.8`). *"Bro, kamu tahu IP-nya `github.com` gak?"* Jika Resolver pernah menyimpannya di *cache*, dia akan langsung memberikan jawabannya. Jika belum, Resolver akan memulai pencarian.

2. **Root Name Server (`.`):**
   Resolver bertanya ke Root Server. Root Server tidak tahu IP pasti dari `github.com`, tapi dia tahu siapa yang memegang ekstensi `.com`. Root Server bilang: *"Coba tanya ke TLD Server bagian `.com` ya!"*

3. **TLD Name Server (Top-Level Domain):**
   Resolver mendatangi TLD Server `.com`. TLD Server juga belum tahu pasti IP akhirnya, tapi dia tahu server mana yang mengelola domain `github`. *"Tanya ke Authoritative Server-nya GitHub di sana ya!"*

4. **Authoritative Name Server:**
   Ini adalah perpustakaan terakhir. Server inilah yang memegang data asli domain `github.com`. Dia menjawab: *"IP Address untuk `github.com` adalah `140.82.121.4`!"*

Resolver menerima IP tersebut, menyimpannya di *cache* lokal, dan meneruskannya ke browser-mu. BUM! Halaman web pun terbuka. Seluruh proses ini biasanya cuma butuh waktu **beberapa milidetik** saja!

## **Mengapa Suatu Website Bisa Diblokir? (DNS Filtering)**

Sekarang masuk ke pertanyaan menarik: **Kenapa situs tertentu bisa diblokir oleh ISP?**

Salah satu metode pemblokiran paling umum yang digunakan ISP adalah **DNS Filtering / DNS Poisoning**.

Sederhananya begini:
Ketika kamu menggunakan DNS default dari ISP-mu, setiap kali kamu meminta IP address untuk situs yang ada di *blacklist* pemerintah/ISP, server DNS ISP **sengaja memberikan jawaban palsu**

1. **Permintaan Kamu:** *"Berapa IP `situs-terlarang.com`?"*

2. **DNS ISP (Normal):** Meneruskan query dan memberikan IP asli.

3. **DNS ISP (Filtering):** *"Oh, situs itu IP-nya `125.160.x.x` (IP halaman Internet Positif)."*

Akibatnya, browser-mu malah diarahkan ke halaman pemblokiran, bukan ke situs aslinya.

## **Solusi & Keamanan: DoH dan DoT**

Secara default, permintaan DNS yang konvensional dikirimkan tanpa enkripsi (teks biasa) melalui port UDP 53, sebuah protokol yang cepat dan efisien untuk pengiriman data tanpa adanya protokol verifikasi awal. Ketidakadaan perlindungan ini menyebabkan dua risiko yang signifikan: \
1. **Pengintipan (Eavesdropping)**: Penyedia layanan internet atau individu lain di jaringan dapat mengawasi situs yang sedang kamu akses.\
2. **Penyamaran** **DNS (DNS Spoofing)** : Pihak ketiga yang berada di jalur koneksi dapat menangkap dan memodifikasi respons DNS untuk mengarahkanmu ke situs palsu.

Untuk mengatasi masalah ini, lahir teknologi enkripsi DNS:

1. **DNS over HTTPS (DoH):** Mengemas query DNS di dalam lalu lintas HTTPS (Port 443). Karena terenkripsi bersamaan dengan traffic web biasa, ISP tidak bisa dengan mudah mengintip atau memanipulasi query DNS kamu.

2. **DNS over TLS (DoT):** Mirip dengan DoH, namun menggunakan protokol TLS tersendiri pada Port 853.

Dengan mengaktifkan DoH di browser (misalnya menggunakan DNS Cloudflare `1.1.1.1` atau AdGuard), query DNS kamu akan terenkripsi sehingga lebih aman dari pengintaian dan manipulasi lalulintas data sederhana.

## Nahh Kesimpulan nya itu

DNS itu kayak seorang pahlawan tanpa tanda jasa di dunia jaringan komputer. Tanpa DNS, internet tidak akan sesimpel dan senyaman yang kita nikmati hari ini. Menganalisis cara kerja DNS memberi kita gambaran jelas bahwa di balik satu klik sederhana, ada koordinasi sistem terdistribusi yang sangat masif dan cepat.

---

## Referensi

1. Ali, B., & Chen, G. (2025). Next-generation AI for advanced threat detection and security enhancement in DNS over HTTPS. *Journal of Network and Computer Applications, 235*, 104326. https://doi.org/10.1016/j.jnca.2025.104326

2. Kim, M., et al. (2024). Measuring DNS-over-HTTPS Downgrades: Prevalence, Techniques, and Bypass Strategies. *Proceedings of the ACM on Networking, 2*(CoNEXT4), 1–22. https://doi.org/10.1145/3696385

3. National Institute of Standards and Technology. (2026). *Secure Domain Name System (DNS) Deployment Guide* (NIST SP 800-81r3). U.S. Department of Commerce. https://doi.org/10.6028/NIST.SP.800-81r3

4. Park, J. S., Kim, H. C., & Lee, K. H. (2022). In-Depth Evaluation of the Impact of National-Level DNS Filtering on DNS Resolvers over Space and Time. *Electronics, 11*(8), 1276. https://doi.org/10.3390/electronics11081276
