const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/reflections.json");

// Get all reflections
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data.reflections);
});

// Add a reflection
router.post("/", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: "Reflection too short" });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  data.reflections.push({
    text,
    date: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Reflection saved" });
});

module.exports = router;
