# 🏦 Bank Simulator API (Node.js)

This is a simple RESTful API for managing user accounts and balances, built with **Node.js** and structured using **Clean Architecture**.

---

## 🚀 Getting Started

### 1. Prerequisites to run the project

[Nodejs version 22 (LTS)](https://nodejs.org/pt/download)

### 2. Clone and install

```bash
git clone https://github.com/fredyranthun/bank-simulator
cd account-service
npm install
```

if you already are in the project folder, you can run directly:

```bash
npm install
```

### 3. Run the project

```bash
npm run build
npm start
```

or run in the development mode:

```bash
npm run dev
```

### 4. Running the project with Docker

To run the Docker container of the project, run the following commands:

```bash
# Build the Docker image
docker build -t bank-simulator .

# Run the container with port 4000 mapped to your host machine
docker run -p 4000:4000 bank-simulator
```
