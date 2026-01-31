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
async function loadReflections() {
  const res = await fetch("/api/reflections");
  const data = await res.json();

  const div = document.getElementById("reflectionList");
  div.innerHTML = "";

  data.reverse().forEach(r => {
    const p = document.createElement("p");
    p.textContent = `${new Date(r.date).toDateString()} — ${r.text}`;
    div.appendChild(p);
  });
}

async function saveReflection() {
  const text = document.getElementById("reflectionText").value;

  const res = await fetch("/api/reflections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (res.ok) {
    document.getElementById("reflectionText").value = "";
    loadReflections();
  } else {
    alert("Reflection too short");
  }
}

loadStats();
loadReflections();

