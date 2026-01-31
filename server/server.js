const express = require("express");
const path = require("path");
const reflectionRoutes = require("./routes/reflections");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use("/api/reflections", reflectionRoutes);

// Routes
app.use("/api/checkin", require("./routes/checkin"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/reflections", require("./routes/reflections"));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
