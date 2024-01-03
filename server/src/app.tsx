import express from "express";
const app = express();
import { connectDB } from "./utils/features.js";
import userRoutes from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js";
// require('dotenv').config()
app.use(express.json());

const PORT = process.env.PORT || 8000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// using routes
app.use("/api/v1/user", userRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("<h1>Server Is Ready</h1>");
});
