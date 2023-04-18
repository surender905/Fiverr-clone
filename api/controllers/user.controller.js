import jwt from "jsonwebtoken";
import User from "../models/user.modal.js";

export const getUser = (req, res) => {
  res.send("hello");
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return res.status(403).send("access denied");
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(200).send("deleted user");
 


};
