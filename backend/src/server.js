const app = require("./app");
const env = require("./config/env");
const { pool } = require("./config/db");

async function bootstrap() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    app.listen(env.port, () => {
      console.log(`Auth server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

bootstrap();
