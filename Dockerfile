FROM ghcr.io/puppeteer/puppeteer:24.2.1
USER root

# Instalujemy Chrome
RUN apt-get update && apt-get install -y wget gnupg2 && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

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
