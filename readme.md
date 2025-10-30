# Wandora Backend

The backend for **Wandora**, a Mini booking project, built with **Node.js**, **TypeScript**, using **Express**, **Prisma**, **Redis**, **AWS**, and other related technologies.

![Tech Stack](https://images5.alphacoders.com/137/thumb-1920-1377411.png)

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/jamesnguyendev/wandora-backend.git
cd wandora-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables by creating a `.env` file:

```env
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_EXPIRE=
REDIS_URL=
REDIS_PORT=
REDIS_PASSWORD=
```

> Note: Fill in all values according to your environment.

4. Set up the database with Prisma:

```bash
npm run prisma:setup
```

---

## 🚀 Running the project

### Run in development:

```bash
npm run dev
```

### Build the project:

```bash
npm run build
```

### Run in production:

```bash
npm start
```

---

## 🧪 Testing

- Run all tests:

```bash
npm test
```

- Run booking module test:

```bash
npm run test:booking
```

- Run tests in watch mode:

```bash
npm run test:watch
```

---

## ⚙️ Scripts

- `dev` - Start development server with hot reload
- `build` - Compile TypeScript to JavaScript
- `start` - Run the compiled code
- `lint` - Lint the code
- `prisma:setup` - Push Prisma schema and generate client
- `test` - Run all Jest tests
- `test:booking` - Run only booking test
- `test:watch` - Run Jest in watch mode

---

## 📌 Dependencies

- **Express** - Web framework
- **Prisma** - ORM
- **Redis (ioredis)** - Caching
- **JWT (jsonwebtoken)** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Morgan** - HTTP request logging
- **Zod** - Input validation
- **AWS** - Cloud services for hosting, storage, and other cloud solutions

---

## 📚 API Documentation

Detailed API documentation including request/response schemas and an OpenAPI (Swagger) spec is available in the `docs/` folder:

- `docs/api.md` - human-readable API reference (endpoints, examples, usage)
- `docs/openapi.yaml` - OpenAPI 3.0 specification (can be imported into Swagger UI / Postman)

To view the API locally, run the server and you will see it on `http://localhost:4000/docs`.

---

## 💡 Author

- Author: James Nguyen
- License: ISC
