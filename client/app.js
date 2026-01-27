    document.getElementById("checkinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    energy: energy.value,
    stress: stress.value,
    focus: focus.value,
    note: note.value
  };

  await fetch("/api/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Check-in saved!");
  e.target.reset();
});
async function loadStats() {
  const res = await fetch("/api/stats");
  const data = await res.json();

  avgEnergy.textContent = data.averages.energy;
  avgStress.textContent = data.averages.stress;
  avgFocus.textContent = data.averages.focus;

  if (data.warning) {
    warningText.textContent = data.warning;
  } else {
    warningText.textContent = "Your recent patterns look stable.";
  }
}

loadStats();
