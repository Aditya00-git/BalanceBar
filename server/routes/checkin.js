const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/entries.json");

router.post("/", (req, res) => {
  const { energy, stress, focus, note } = req.body;

  const data = JSON.parse(fs.readFileSync(dataPath));
  data.checkins.push({
    date: new Date().toISOString(),
    energy,
    stress,
    focus,
    note
  });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ message: "Check-in saved" });
});

module.exports = router;
