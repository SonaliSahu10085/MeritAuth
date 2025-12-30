require("dotenv/config");
const express = require("express");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Common Middlewares Setup
const corsOptions = {
  origin: ["http://localhost:5173"], // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // allow cookies / auth headers
};

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

// Accessing environmental variables
const { PORT, DB_URL } = process.env;

// Establishing the Database Connection
connectDB(DB_URL);

// Endpoints
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");

app.get("/", (req, res) => {
  res.json({
    message: `Server is running on port ${PORT || 3000}`,
  });
});


app.use("/api/auth", authRouter);
app.use("/api/admin/users", adminRouter);
app.use("/api/users", userRouter);

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not exists",
  });
});


app.listen(3434, () =>
  console.log(`Server is running on port ${PORT || 3000}`)
);
