FROM ghcr.io/puppeteer/puppeteer:24.2.1

# Instalujemy Chrome
RUN apt-get update && apt-get install -y google-chrome-stable

# Ustawiamy Puppeteer, aby korzystał z systemowego Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Kopiujemy pliki zależności
COPY package*.json ./
RUN npm ci

# Kopiujemy resztę plików
COPY . .

# Uruchamiamy bota
CMD [ "node", "index.js" ]
