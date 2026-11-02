# Works on Railway, Koyeb, Fly.io, Northflank, VPS (docker), etc.
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV PORT=8000
EXPOSE 8000
CMD ["node", "index.js"]
