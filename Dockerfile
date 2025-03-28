FROM node:23-alpine AS build

WORKDIR /app
COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "dist/index.js]





