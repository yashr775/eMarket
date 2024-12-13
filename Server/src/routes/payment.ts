import express from "express";
import { allCoupons, applyDiscount, deleteCoupon, getCoupon, newCoupon, updateCoupon } from "../controllers/payment.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/coupon/new", newCoupon);
app.get("/discount", applyDiscount);
app.get("/coupon/all",adminOnly ,allCoupons)

app
  .route("/coupon/:id")
  .get(adminOnly, getCoupon)
  .put(adminOnly, updateCoupon)
  .delete(adminOnly, deleteCoupon);

export default app;
