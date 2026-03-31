import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const CheckUserExist = "SELECT * FROM users WHERE email = ?";
  db.query(CheckUserExist, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(201).json({ message: "User created successfully" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = result[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    return res.status(200).json({ message: "User logged in successfully", token });
  });
};

export { register, login };