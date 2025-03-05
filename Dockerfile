FROM node:18-slim
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV development

CMD ["npm", "run", "dev"]
