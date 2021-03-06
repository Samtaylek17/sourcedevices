FROM node:16.13.2
# Setting node version
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]