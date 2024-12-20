import dotenv from "dotenv";
import express from "express";
import { DBconnection } from "./DBconnection.js";
import user from "./Routes/User.Routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBconnection()
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); 
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", user);
