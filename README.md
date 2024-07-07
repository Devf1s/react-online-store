# Online Store

React web app built using the PERN stack (PostgreSQL, Express.js, React, Node.js).

## Installation
###  1. Clone the repository
   ```bash
   git clone https://github.com/Devf1s/react-online-store.git
   cd react-online-store
   ```
### 2. Install dependencies (Node.js is required: https://nodejs.org/en/):
- Client
```bash
cd client
npm i 
```
- Server
```bash
cd server
npm i
```

### 3. Create environment variables:
- Create `.env` file based on `.env.example` on the server side
```
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=secret_key
```

## Usage
### 1. Start client app:
- `npm start` - runs the app in the development mode
- `npm run build` - building production version (minimized and optimized) to the **build** folder
- `npm test` - launches the test runner in the interactive **watch mode**
- `npm run eject` - exposes the build configuration files  

### 2. Start server side:
- `npm run start` - starts the server with nodemon for development (with hot-reloading enabled)
- `npm run launch` - starts the server in production mode
