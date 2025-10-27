// index.js
import express from "express";
import cors from "cors";
import { connectDB } from "./data/config.js";
import contactRoutes from "./routes/contactRoutes.js"; 
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import publicProductRoutes from "./routes/publicProductRoutes.js";
import publicCategoryRoutes from "./routes/publicCategoryRoutes.js"; // ✅ nuevo
import colorRoutes from "./routes/colorRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Rutas públicas
app.use("/api/products/public", publicProductRoutes);
app.use("/api/categories/public", publicCategoryRoutes); // ← agregada

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// ✅ Rutas protegidas (solo admin)
app.use("/api/contacts", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/categories", categoryRoutes);

// Conexión a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log("Server running in http://localhost:" + PORT);
});
