import connection from "../config/db.js";
import bcrypt from "bcrypt";
import { genToken } from "../util/authToken.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // password hashing can be added here for security

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [name, email, hashedPassword], (err, results) => {
      if (err) {
        console.error("DB Error", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("DB Error", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const existingUser = results[0];

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      await genToken(existingUser, res);

      res.status(200).json({
        message: "Login successful",
        data: existingUser,
      });
    });
  } catch (error) {
    next(error);
  }
};
