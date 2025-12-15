FROM node:20-bullseye-slim

WORKDIR /usr/src/app

# copiar package.json primeiro para cache
COPY package*.json ./

# instalar dependência

# copiar código fonte
COPY . .

# compilar para dist
RUN npm run build

# remover devDeps 
RUN npm prune --production

EXPOSE 3000
CMD ["node", "dist/main.js"]
