# README.md

# 📚 Frontend-App för TimeLock

## 📦 Projektbeskrivning

Detta projekt är en frontend-server byggd i **Node.js/Express** som använder **EJS** för rendering av vyer och **Firebase** för Google-inloggning.
Den fungerar som en klient mot ett autentiseringstjänst (**auth-service**) via REST API och är förberedd för både **lokal utveckling** och **produktion i Docker/Cloud**.

---

## 🛠️ Lokala inställningar (Utvecklingsmiljö)

| Konfiguration | Värde |
|:---|:---|
| Port | `.env` → `PORT=3000` |
| Cookie Secure | `false` |
| Cookie SameSite | `'lax'` |
| CSP (Content Security Policy) | Tillåter `gstatic`, `googleapis`, `apis.google.com`, `firebaseapp.com` |
| Sessions | Sparas i serverminne via `express-session` |

### ⚠️ Viktigt lokalt
- **Session cookies:** `secure: false`, `sameSite: 'lax'`
- **Content Security Policy:**
  - `script-src`: `'self'`, `https://www.gstatic.com`, `https://www.googleapis.com`, `https://apis.google.com`
  - `frame-src`: `'self'`, `https://*.firebaseapp.com`, `https://*.google.com`
- **CSRF-skydd:** Alla POST-requests kräver korrekt `_csrf`-token.

---

## 🚀 Produktion (Docker/CSCloud)

Vid deployment till Docker/CSCloud måste du:

| Vad som ändras | Nytt värde |
|:---|:---|
| `NODE_ENV` | `production` |
| Cookie Secure | `true` |
| Cookie SameSite | `'strict'` |
| HTTPS | Obligatoriskt |
| Miljövariabler | Måste vara korrekt satta |

### 🔥 Produktionskrav
- **Session cookies:** `secure: true`, `sameSite: 'strict'`
- **Servern måste köras bakom HTTPS.**
- **Miljövariabler:**
  - `SESSION_SECRET`
  - `SESSION_NAME`
  - `PORT`


## ✨ Teknisk översikt

- **Express**: HTTP-server och routing
- **Helmet**: Säkerhetsheaders (inkl CSP)
- **CSURF**: CSRF-skydd
- **Express-Session**: Sessionshantering
- **EJS**: Server-renderade vyer
- **Morgan + Winston**: HTTP- och applikationsloggning
- **Firebase**: Google-inloggning via popup
- **RateLimiter**: Skydd mot brute-force

---

## 👉 Kom ihåg vid produktion!
- Sätt ett starkt **SESSION_SECRET**.
- Använd endast **HTTPS**.
- Verifiera att CSP tillåter alla nödvändiga Google-tjänster.
- Hantera .env och hemligheter säkert via Docker Secrets eller CI/CD pipelines.

---

# 📈 Versionshistorik
- v1.0: Lokal utvecklingsmiljö konfigurerad
- v1.1: Docker-stöd och CSP-anpassningar för Google login

---

# 📚 Licens
Detta projekt är öppet för utbildning och personlig utveckling.

