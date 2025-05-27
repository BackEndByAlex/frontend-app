[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

# Frontend-App

> En modern, modulär Express-baserad frontend för inloggning, registrering, lösenordsåterställning, sparade lösenord och feedback.

---

## 🚀 Funktioner

* **Auth & SSO**

  * Inloggning via formulär (`/auth/login`)
  * Google OAuth2 (`/auth/login/google`)
  * Logout (`/auth/logout`)
* **Användarflöden**

  * Registrering (`/register`)
  * Glömt lösenord & återställning (`/forgot-password` → `/forgot-password/reset/:token`)
* **Lösenordshantering**

  * Generera nytt, slumpmässigt lösenord (`/password/generate`)
  * Spara nytt lösenord (`POST /password`)
  * Visa, uppdatera & ta bort sparade lösenord (`GET/PUT/DELETE /password/:id`)
* **Feedback**

  * Skicka feedback till auth-service (`POST /feedback`)
  * Hämta all feedback (`GET /feedback`)
* **Firebase config**

  * Klient-SDK-konfiguration via `/firebase`
* **Säkerhet & Sessions**

  * CSRF-skydd med `csurf`
  * Sessionshantering med `express-session`
  * Flash-meddelanden för fel/framgång
* **Frontend-optimeringar**

  * EJS-/Pug-mallar i `views/`
  * Statisk bundling i `public/`
  * Loggning via `winston` & `morgan`

---

## 📁 Projektstruktur

```text
src/
├── controllers/       # Express-controllers per funktion/feature
│   ├── auth/          # login, logout, Google-login, form-login
│   ├── register/      # render + handle registration
│   ├── forgotPassword/# render + handle forgot/reset flows
│   ├── password/      # CRUD + generate
│   ├── page/          # renderHome, dashboard, verifyCode, session-check
│   ├── feedback/      # get/send feedback
│   └── firebase/      # getFirebaseConfig
├── routes/            # Express-routerar per kategori
│   ├── pageRouter.js  
│   ├── ControlerRoutes/  
│       ├──registerRouter.js
│       ├──forgotPasswordRouter.js
│       ├──passwordRouter.js
│       ├──feedbackRouter.js
│       ├──firebaseRouter.js
├── services/          # API-anrop (auth, password, registration)
│   ├── auth/          # login, googleAuth, verifyCode, sendCode
│   ├── password/      # forgot, verifyReset, reset, generate, CRUD
│   └── registrationService.js
├── views/             # EJS-/Pug-templates (layouts, partials, pages)
├── public/            # CSS, bilder, klient-JS, fonts
├── config/            # session.js, csrf.js, logger.js, etc.
├── middleware/        # authMiddleware, jwtAuth, errorHandlers
└── server.js             # Express-app & global middleware
```

---

## ⚙️ Installation

1. Klona repot:

   ```bash
   git clone git@github.com:min-org/frontend-app.git
   cd frontend-app
   ```
2. Installera beroenden:

   ```bash
   npm install
   ```
3. Skapa `.env` i projektroten och lägg till:

   ```dotenv
   # Server
   PORT=3000
   SESSION_SECRET=your_session_secret

   # CSRF
   CSRF_SECRET=your_csrf_secret

   # API endpoints
   AUTH_SERVICE_URL=http://localhost:4000
   PASSWORD_SERVICE_URL=http://localhost:5000

   # Firebase (om används)
   FIREBASE_API_KEY=...
   FIREBASE_AUTH_DOMAIN=...
   FIREBASE_PROJECT_ID=...
   ```

---

## 🏃‍♂️ Köra applikationen

* **Utveckling** (med automatisk reload):

  ```bash
  npm run dev
  ```
* **Produktion**:

  ```bash
  npm start
  ```
* **Environment**:

  * `.env.development`, `.env.production` kan hanteras med `dotenv-flow` om önskas.

---

## 📦 Scripts i `package.json`

| Script           | Beskrivning                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Startar app med `nodemon`            |
| `npm start`      | Kör app i produktion (`node app.js`) |
| `npm run lint/lint:fix`   | Kör ESLint                           |
| `npm run test:unit` | Kör alla vitest tester                       |
---

## 🔧 Miljövariabler

| Variabel               | Beskrivning                         | Exempel                        |
| ---------------------- | ----------------------------------- | ------------------------------ |
| `PORT`                 | Port där appen körs                 | `3000`                         |
| `SESSION_SECRET`       | Hemlig sträng för sessionssignering | `s3cr3t`                       |
| `CSRF_SECRET`          | Hemlig sträng för CSRF-token        | `csrf1234`                     |
| `AUTH_SERVICE_URL`     | Bas-URL för auth-microservicen      | `http://localhost:4000/api/v1` |
| `PASSWORD_SERVICE_URL` | Bas-URL för password-microservicen  | `http://localhost:5000/api/v1` |
| `FIREBASE_API_KEY`     | Klient-nyckel för Firebase SDK      | `AIza...`                      |
| `FIREBASE_AUTH_DOMAIN` | Auth-domain för Firebase            | `myapp.firebaseapp.com`        |
| `FIREBASE_PROJECT_ID`  | Projekt-ID i Firebase               | `myapp-project`                |

---

## ✅ Testning

> *(Kommer snart flera: enhetstester, integrationstester, systemtester)*

```bash
npm run test:unit
```

---

## 🚦 CI/CD

* **GitHub Actions**: bygg- och lint-steg på varje PR
* **Deploy**: Docker
* **Docker**: inkludera `Dockerfile` och `docker-compose.yml` för lokale testing

---

## 📄 Contributing

1. Forka projektet
2. Skapa feature-branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "feat: beskriver vad som gjordes"`
4. Push: `git push origin feature/my-feature`
5. Öppna PR och beskriv ditt ärende

---

## 📖 Kodstandard & Styleguide

* **ESLint**: följer `.eslintrc.js` (Airbnb-regler)
* **Prettier**: egenskaper i `.prettierrc`
* **Branch-naming**: `feature/`, `refactor/`

---

## 🆘 Felsökning

* **CSRF-fel**: se att du inkluderar `<input type="hidden" name="_csrf"...>`
* **CORS**: om frontend och backend körs på olika domäner – konfigurera `cors`-paketet
* **Sessions**: kontrollera att `SESSION_SECRET` är satt identiskt över alla instanser

---

## 📄 Licens

Detta projekt är licensierat under Creative Commons BY 4.0.
Se [LICENSE.md](LICENSE.md) för detaljer.
