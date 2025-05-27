# ─────────────────────────────────────────────────────────────
# Produktion: Node‐app med konfigurations-filer skapade av CI/CD
# ─────────────────────────────────────────────────────────────

FROM node:23-slim
WORKDIR /app

# 1) Installera beroenden först (för bättre cache)
COPY package*.json ./
RUN npm install --only=production

# 2) Kopiera applikationskoden
COPY . .

# 3) Sätt NODE_ENV
ENV NODE_ENV=production

# 4) Exponera port
EXPOSE 3001

# 5) Starta appen
CMD ["npm", "start"]