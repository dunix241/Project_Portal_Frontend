FROM node:lts as build
LABEL authors="datvo"
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .
RUN npm run build

FROM node:lts
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]