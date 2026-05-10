import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connection from "./src/config/db.js";
import AuthRouter from "./src/routes/authRouter.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const error = (err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const statusCode = err.status || 500;
  console.error(err);
  res.status(statusCode).json({ message: errorMessage });
};
app.use(error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
