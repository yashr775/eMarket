import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import {
  getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/latest", getLatestProducts);
app.get("/categories", getAllCategories);
app.get("/admin-products", getAdminProducts);

app.route("/:id").get(getSingleProduct).put(singleUpload, updateProduct);

export default app;
