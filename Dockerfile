FROM node:17
WORKDIR /app
COPY . .
RUN npm install
COPY package.json /
EXPOSE 3001
CMD ["npm", "start"]