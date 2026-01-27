const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/entries.json");

router.post("/", (req, res) => {
  const { text } = req.body;

  const data = JSON.parse(fs.readFileSync(dataPath));
  data.reflections.push({
    date: new Date().toISOString(),
    text
  });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ message: "Reflection saved" });
});

module.exports = router;
