import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "Ecommerce_MERN",
    })
    .then(() => console.log("DB connection established Successfully"))
    .catch(() => console.log("DB connection failed"));
};
