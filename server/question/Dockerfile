FROM node
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install
EXPOSE 5200
CMD ["node", "/app/index.js"]