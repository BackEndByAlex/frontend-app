# ─────────────────────────────────────────────────────────────
# Produktion: Node‐app med konfigurations-filer från config/
# ─────────────────────────────────────────────────────────────

FROM node:23-slim
WORKDIR /app

# 1) Inkludera konfigurationsfiler
#    Dessa skapas av CI-pipelinen i mappen config/
COPY config/.env        .env
COPY config/public.pem  ./public.pem

# 2) Installera beroenden (endast production för snabbhet)
COPY package*.json ./
RUN npm ci --only=production

# 3) Kopiera resten av applikationen
COPY . .

# 4) Sätt NODE_ENV
ENV NODE_ENV=production

# 5) Exponera port
EXPOSE 3001

# 6) Starta appen
CMD ["npm", "start"]
