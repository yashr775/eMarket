import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { NewOrderRequestBody } from "../types/types.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { Request } from "express";

const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
      return next(new ErrorHandler("Please Enter All Fields", 400));

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    await invalidateCache({ product: true, order: true, admin: true });

    return res
      .status(201)
      .json({ success: true, message: "Order placed successfully" });
  }
);

const myOrder = TryCatch(async (req, res, next) => {
  const { id: user } = req.query;

  let orders = [];

  if (myCache.has(`my-orders-${user}`)) {
    orders = JSON.parse(myCache.get(`my-orders-${user}`)!);
  } else {
    orders = await Order.find({ user });
    myCache.set(`my-orders-${user}`, JSON.stringify(orders));
  }

  await invalidateCache({ product: true, order: true, admin: true });

  return res.status(200).json({ success: true, orders });
});

const allOrders = TryCatch(async (req, res, next) => {
  const key = "all-orders";

  let orders = [];

  if (myCache.has(key)) {
    orders = JSON.parse(myCache.get(key)!);
  } else {
    orders = await Order.find();
    myCache.set(key, JSON.stringify(orders));
  }

  await invalidateCache({ product: true, order: true, admin: true });

  return res.status(200).json({ success: true, orders });
});

export { newOrder, myOrder, allOrders };
