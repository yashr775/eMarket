import express from "express";
import { allOrders, myOrder, newOrder } from "../controllers/orders.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", newOrder);
app.get("/my",myOrder)
app.get("/all",adminOnly,allOrders)

export default app;
