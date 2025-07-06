# 💍 Jewelry Product Listing App

Modern ve şık bir mücevher e-ticaret uygulaması. Gerçek zamanlı metal fiyatlandırması ve premium kullanıcı deneyimi ile.

 ## Canlı Demo : 
 https://jew-product-list.vercel.app


## ✨ Özellikler

### 🏆 **Gerçek Zamanlı Metal Fiyatlandırması**
- Canlı altın, gümüş ve platin fiyatları
- Metals API entegrasyonu
- 1 saatlik akıllı önbellekleme sistemi
- Otomatik fallback fiyatlandırması

### 💍 **Premium Ürün Katalogu**
- 8 adet özel tasarım nişan yüzüğü
- 3 farklı metal seçeneği (Altın, Gümüş, Platin)
- Yüksek kaliteli ürün görselleri
- Renk değiştirme özelliği

### 🔍 **Gelişmiş Filtreleme**
- Fiyat aralığı filtresi
- Popülerlik skoru filtresi
- Gerçek zamanlı arama
- Responsive filtre paneli

### 📱 **Modern Tasarım**
- Mobile-first responsive tasarım
- Minimal ve şık arayüz
- Tailwind CSS + shadcn/ui bileşenleri
- Smooth animasyonlar ve geçişler

### ⚡ **Performans Optimizasyonu**
- Next.js 14 App Router
- Akıllı API önbellekleme
- Lazy loading
- Optimized görsel yükleme

## 🚀 Hızlı Başlangıç

### Gereksinimler

- **Node.js** 18.0 veya üzeri
- **npm** veya **yarn** paket yöneticisi
- **Metal Price API** anahtarı ([metals-api.com](https://metals-api.com) önerilir)

### Kurulum

1. **Projeyi klonlayın:**
   \`\`\`bash
   git clone https://github.com/zelihaguven/jew-product-list.git
   cd jewelry-store-app
   \`\`\`

2. **Bağımlılıkları yükleyin:**
   \`\`\`bash
   npm install
   # veya
   yarn install
   # veya
   pnpm install
   \`\`\`

3. **Environment dosyasını oluşturun:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **API anahtarınızı yapılandırın:**
   \`\`\`env
   # .env.local dosyasına ekleyin
   METALS_API_KEY=your_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

5. **Development sunucusunu başlatın:**
   \`\`\`bash
   npm run dev
    veya
   yarn dev
    veya
   pnpm dev
   \`\`\`



## 🔧 Konfigürasyon

### Environment Variables

| Değişken | Açıklama | Gerekli | Varsayılan |
|----------|----------|---------|------------|
| `METALS_API_KEY` | Metal fiyat API anahtarı | ✅ | - |
| `NEXT_PUBLIC_BASE_URL` | Uygulama base URL'i | ✅ | `http://localhost:3000` |
| `NODE_ENV` | Çalışma ortamı | ❌ | `development` |

### API Test

Uygulamada built-in API test paneli bulunur:

1. Uygulamayı açın
2. "Test API Connections" butonuna tıklayın
3. Hangi API servisinin çalıştığını görün
4. Önerilen API'yi kullanın

## 📡 API Endpoints

### Products API
\`\`\`
GET /api/products
\`\`\`

**Query Parameters:**
- `realTimePrice` (boolean): Gerçek zamanlı fiyat kullan
- `minPrice` (number): Minimum fiyat filtresi
- `maxPrice` (number): Maksimum fiyat filtresi
- `minPopularity` (number): Minimum popülerlik skoru
- `maxPopularity` (number): Maksimum popülerlik skoru

**Response:**
\`\`\`json
{
  "products": [...],
  "goldPrice": 65.23,
  "isRealTimePrice": true,
  "timestamp": "2024-01-01T12:00:00Z"
}
\`\`\`

### Metal Price Test API
\`\`\`
GET /api/test-metal-price
\`\`\`

Farklı metal fiyat API'lerini test eder ve çalışan servisi önerir.

## 🏗️ Teknoloji Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Icons:** Lucide React

### Backend
- **API Routes:** Next.js API Routes
- **External APIs:** Metal Price APIs
- **Caching:** In-memory caching

### Deployment
- **Platform:** Vercel (önerilen)
- **Alternative:** Netlify, Railway, DigitalOcean

## 🚀 Deployment

### Vercel (Önerilen)

1. **GitHub'a push edin:**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Vercel'e bağlayın:**
   - [vercel.com](https://vercel.com) hesabınıza giriş yapın
   - "New Project" tıklayın
   - GitHub repository'nizi seçin

3. **Environment variables ekleyin:**
   - Vercel dashboard → Settings → Environment Variables
   - `METALS_API_KEY` ve `NEXT_PUBLIC_BASE_URL` ekleyin

4. **Deploy edin!** 🎉

### Manuel Deployment

1. **Production build:**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Production sunucusu:**
   \`\`\`bash
   npm start
   \`\`\`

## 📁 Proje Yapısı

\`\`\`
jewelry-store-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
│   ├── ui/               # shadcn/ui bileşenleri
│   ├── product-card.tsx  # Ürün kartı
│   ├── product-filters.tsx # Filtre paneli
│   └── ...
├── data/                 # Static data
│   └── products.json     # Ürün verileri
├── lib/                  # Utility fonksiyonlar
├── public/              # Static assets
├── .env.local           # Environment variables
├── .env.example         # Environment template
└── README.md           # Bu dosya
\`\`\`

## 🎨 Özelleştirme

### Yeni Ürün Ekleme

`data/products.json` dosyasını düzenleyin:

\`\`\`json
{
  "id": 9,
  "name": "Yeni Yüzük",
  "popularityScore": 85,
  "weight": 2.5,
  "images": {
    "yellow": "https://example.com/yellow.jpg",
    "rose": "https://example.com/rose.jpg",
    "white": "https://example.com/white.jpg"
  }
}
\`\`\`

### Tema Özelleştirme

`tailwind.config.ts` dosyasında renkleri değiştirin:

\`\`\`typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#your-color',
          // ...
        }
      }
    }
  }
}
\`\`\`

## 🧪 Test

\`\`\`bash
# Unit testler
npm run test

# E2E testler
npm run test:e2e

# API testleri
npm run test:api
\`\`\`

## 📈 Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

## 🤝 Katkıda Bulunma

1. **Fork** edin
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** edin (`git commit -m 'Add amazing feature'`)
4. **Push** edin (`git push origin feature/amazing-feature`)
5. **Pull Request** açın

### Development Guidelines

- TypeScript kullanın
- ESLint kurallarına uyun
- Prettier ile format edin
- Commit mesajlarında [Conventional Commits](https://conventionalcommits.org/) kullanın

## 📝 Changelog

### v1.0.0 (2024-01-01)
- ✨ İlk sürüm yayınlandı
- 🏆 Gerçek zamanlı metal fiyatlandırması
- 💍 8 adet premium ürün
- 📱 Responsive tasarım
- 🔍 Gelişmiş filtreleme

## 📄 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Metals API](https://metals-api.com/) - Metal price data
- [Vercel](https://vercel.com/) - Deployment platform

---

 Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

