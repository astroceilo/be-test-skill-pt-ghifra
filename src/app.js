import express from "express";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// semua route di sini
app.use("/", productRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});