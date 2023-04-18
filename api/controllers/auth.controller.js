import bcrypt from "bcrypt";
import User from "../models/user.modal.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("user is created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));

    const isCorrect = bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(404, "user password didn't match"));

    const { password, ...info } = user._doc;
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
