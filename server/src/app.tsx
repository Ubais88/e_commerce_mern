import express from "express";
const app = express();
import { connectDB } from "./utils/features.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import { errorMiddleware } from "./middlewares/error.js";
// require('dotenv').config()
app.use(express.json());

const PORT = process.env.PORT || 8000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// using routes
app.use( errorMiddleware );
app.use('/uploads', express.static("uploads"));
app.use("/api/v1/user", userRoute );
app.use("/api/v1/product", productRoute )



app.get("/", (req, res) => {
  res.send("<h1>Server Is Ready</h1>");
});
