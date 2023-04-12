import bcrypt from "bcrypt";
import User from "../models/user.modal.js";

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("user is created");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send("user not found");

    const isCorrect = bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return res.status(404).send("password is incorrect");

    const { password, ...info } = user._doc;

    res.status(200).send(info);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

export const logout = async (req, res) => {
  try {
  } catch (error) {}
};
