import db from "../config/db.js";

const getTasks = (req, res) => {
  const query = "SELECT * FROM tasks";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(result);
  });
};


const createTask = (req, res) => {
  const { user_id, title, description, status, property, due_date } = req.body;
  const query = "INSERT INTO tasks (user_id, title, description, status, property, due_date) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [user_id, title, description, status, property, due_date || null], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error", error: err });
    }
    res.json(result);
  });
};

const getSingleTask = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM tasks WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(result);
  });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const query = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";
  db.query(query, [title, description, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(result);
  });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(result);
  });
};

export { getTasks, createTask, getSingleTask, updateTask, deleteTask };