import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const mySqlPool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

if (DB_HOST && DB_USER && DB_DATABASE) {
  console.log(`✅ Database Pool Configured:
  - Host: ${DB_HOST}
  - User: ${DB_USER}
  - Database Name: ${DB_DATABASE}`);
} else {
  console.error(
    "❌ Missing or invalid environment variables for database configuration."
  );
}


export default mySqlPool;