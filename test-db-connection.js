const mysql = require("mysql2/promise");
require("dotenv").config();

async function testConnection() {
  try {
    console.log("Testing MySQL connection...");
    console.log("Host:", process.env.DB_HOST);
    console.log("Port:", process.env.DB_PORT);
    console.log("User:", process.env.DB_USER);
    console.log("Database:", process.env.DB_NAME);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Successfully connected to MySQL database!");

    // Test query
    const [rows] = await connection.execute("SELECT VERSION() as version");
    console.log("MySQL Version:", rows[0].version);

    await connection.end();
    console.log("Connection closed.");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);

    // Try without specifying database (in case it doesn't exist yet)
    try {
      console.log("\nTrying to connect without specifying database...");
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });

      console.log("✅ Connected to MySQL server!");

      // Try to create database
      await connection.execute(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
      );
      console.log(
        `✅ Database '${process.env.DB_NAME}' created or already exists`
      );

      await connection.end();
    } catch (secondError) {
      console.error("❌ Still failed:", secondError.message);
    }
  }
}

testConnection();
