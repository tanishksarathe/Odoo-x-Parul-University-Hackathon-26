import connection from "../config/db.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const gotCookie = req?.cookies?.jwt;

    const decrypted = await jwt.verify(gotCookie, process.env.JWT_SECRET_KEY);

    if (!decrypted) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verifySql = "SELECT * FROM users WHERE id = ?";
    connection.query(verifySql, [decrypted.id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const verifyUser = results[0];

      if (!verifyUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = verifyUser;

      next();
    });
  } catch (error) {
    next(error);
  }
};
