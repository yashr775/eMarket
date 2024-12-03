import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, photo, gender, _id, dob, email } = req.body;

    const user = await User.create({ name, photo, gender, _id, dob, email });

    res
      .status(200)
      .json({ success: true, message: `Welcome user ${user.name}` });
  } catch (error) {}
};

export { newUser };
