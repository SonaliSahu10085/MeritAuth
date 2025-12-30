require("dotenv/config");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/dbConfig");
const job = require("./utils/cron");

const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

/* -------------------- MIDDLEWARES -------------------- */
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true,
};

app.use(express.json({ limit: "10mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors(corsOptions));

/* -------------------- ENV VARIABLES -------------------- */
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

/* -------------------- DATABASE -------------------- */
connectDB(DB_URL);

/* -------------------- CRON JOB -------------------- */
job.start();

/* -------------------- ROUTES -------------------- */
app.get("/", (req, res) => {
  res.json({
    message: 'Welcome to Backend Server',
  });
});

app.use("/api/auth", authRouter);
app.use("/api/admin/users", adminRouter);
app.use("/api/users", userRouter);

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint does not exist",
  });
});

/* -------------------- SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
