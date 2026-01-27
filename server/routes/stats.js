const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/entries.json");

// Helper: average of last N values
function average(arr, key, n = 5) {
  const slice = arr.slice(-n);
  if (slice.length === 0) return 0;
  const sum = slice.reduce((acc, item) => acc + Number(item[key]), 0);
  return (sum / slice.length).toFixed(1);
}

router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const checkins = data.checkins;

  const avgEnergy = average(checkins, "energy");
  const avgStress = average(checkins, "stress");
  const avgFocus = average(checkins, "focus");

  let warning = null;

  if (avgEnergy <= 2 && avgStress >= 4) {
    warning = "You may be experiencing early burnout signs.";
  } else if (avgStress >= 4) {
    warning = "Stress levels have been consistently high.";
  } else if (avgEnergy <= 2) {
    warning = "Energy levels have been low recently.";
  }

  res.json({
    averages: {
      energy: avgEnergy,
      stress: avgStress,
      focus: avgFocus
    },
    warning
  });
});

module.exports = router;
