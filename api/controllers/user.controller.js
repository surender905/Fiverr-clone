import User from "../models/user.modal.js";

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const deleteUser = async (req, res, nes) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return res.status(403).send("access denied");
  }
  await User.findByIdAndDelete(req.params.id);

  res.status(200).send("deleted user");
};
