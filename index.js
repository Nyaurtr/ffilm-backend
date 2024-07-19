const express = require("express");
const connectDB = require("./src/configs/db");
const cors = require("cors");
const userRoute = require("./src/routes/userRoute");
const articleRoute = require("./src/routes/articleRoute");
const commentRoute = require("./src/routes/commentRoute");
const PORT = 8000;
const app = express();
connectDB();
// app.use(cors());
app.use(cors({
  origin: ["https://frontend-roan-mu.vercel.app","http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/article", articleRoute);
app.use("/api/comment", commentRoute);
app.use("/", (req, res) => {
  res.send(`${req.method} Route ${req.path} not found !`);
});
app.listen(PORT, () => {
  console.log(`server run on port ${PORT} ✅`);
});
