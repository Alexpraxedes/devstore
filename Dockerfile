FROM node:20-alpine

RUN npm i -g next@latest react@latest react-dom@latest
WORKDIR /app
COPY . .
CMD ["tail", "-f", "/dev/null"]
