# Estágio 1: Construir o aplicativo Vue
FROM node:8-alpine AS build

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos 'package.json' e 'package-lock.json' (ou 'yarn.lock')
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .

# Construir o aplicativo para produção
RUN npm run build

# Estágio 2: Servir o aplicativo usando Nginx
FROM nginx:alpine

# Copiar os arquivos de distribuição do estágio de construção para o diretório de serviço do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 8081
EXPOSE 8081

# Iniciar o Nginx quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]
