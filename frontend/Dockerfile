FROM node:alpine

WORKDIR /app
COPY . .

RUN npm install


EXPOSE 5173

RUN npm run build

ENTRYPOINT ["npm", "run", "preview"]