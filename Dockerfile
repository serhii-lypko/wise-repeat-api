FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:18

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

CMD [  "npm", "run", "start:migrate:prod" ]

# docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=postgres --name wise-repeat-postgres --network=wise-repeat-network postgres

# docker run -d --rm -p 4000:8000 --network=wise-repeat-network --env-file=.env --name wise-repeat-server wise-repeat-server

# sudo certbot --nginx -d wr-api.sl-tech-playground.com -d www.wr-api.sl-tech-playground.com











