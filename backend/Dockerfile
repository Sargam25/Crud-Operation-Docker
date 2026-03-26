FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# wait-for-it.sh (optional, recommended)
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

EXPOSE 5050

# Wait for MySQL before starting server
CMD ["./wait-for-it.sh", "mysql:3306", "--timeout=60", "--", "node", "server.js"]
