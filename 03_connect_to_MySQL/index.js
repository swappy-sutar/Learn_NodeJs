import dotenv from "dotenv";
dotenv.config(); 
import { app } from "./app.js";
import mySqlPool from "./Config/Db.config.js";

const PORT = process.env.PORT || 8000;

mySqlPool
  .query("SELECT 1")
  .then(() => {
    app
      .listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`❌ Port ${PORT} is already in use.`);
        } else {
          console.error(`❌ Error starting server: ${err.message}`);
        }
      });

  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

