import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category, description } = req.body;
    console.log(req.body);
    const photo = req.file;

    if (!photo) next(new ErrorHandler("Please add photo", 400));

    if (!name || !price || !stock || !category || !description) {
      if (photo?.path)
        rm(photo?.path, () => {
          console.log("file deleted");
        });
      next(new ErrorHandler("Please enter All Fields", 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photos: photo?.path,
      description,
    });

    return res
      .status(201)
      .json({ success: true, message: "Product is created" });
  }
);

const getLatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  return res.status(200).json({ message: "Latest five products", products });
});

const getAllCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");

  return res.status(200).json({ message: "List of Categories", categories });
});

const getAdminProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});

  return res.status(200).json({
    success: true,
    products,
  });
});

const getSingleProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  console.log(id);

  const product = await Product.findById(id);
  console.log(product);
  return res.status(200).json({
    success: true,
    product,
  });
});

const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category, description } = req.body;
  const photos = req.file;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photos) {
    rm(product.photos!, () => {
      console.log("old photo deleted");
    });
    product.photos = photos.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (description) product.description = description;

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export {
  newProduct,
  getLatestProducts,
  getAllCategories,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
};
