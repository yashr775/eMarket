import dotenv from "dotenv";
import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, { dbName: "eMarket" })
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e) => console.error(e.message));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    // const products = await Product.find({}).select("_id");

    if (typeof productId === "string") {
      productKeys.push(`product-${productId}`);
    }

    if (typeof productId === "object") {
      productId.forEach((i) => productKeys.push(`product-${productId}`));
    }

    // products.forEach((i) => {
    //   productKeys.push(`product-${i._id}`);
    // });

    myCache.del(productKeys);
  }

  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];
    const orders = await Order.find({}).select("_id");
    orders.forEach((i) => {
      orderKeys.push(`order-${i._id}`);
    });
    myCache.del(orderKeys);
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};
