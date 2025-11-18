import AdminUser from "../models/Adminuser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createItem, updateItem } from "./common_controller.js";

const errMessage = "Something went wrong please try again later";

export const adminUserLogin = async (req, res) => {
  try {
    const user = await AdminUser.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ message: "Invalid Username" });
    } else {
      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({ message: "Invalid Password" });
      } else {
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECERT_KEY,
          { expiresIn: "3d" }
        );
        res.status(200).json({ message: "User Verified", token: token });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const loginUserData = async (req, res) => {
  try {
    const user = await AdminUser.findOne({ _id: req.body.userId });
    return res.status(200).json({ message: "User Fetch Successfully", user });
  } catch (error) {
    res.status(500).json({ message: errMessage }).end();
  }
};
export const createAdminUser = async (req, res) => {
  try {
    const user = await AdminUser.findOne({ username: req.body.username });
    if (!user) {
      createItem(req, res, AdminUser, "AdminUser");
    } else {
      res.status(404).json({ message: "Username Already exist" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const updateAdminUser = async (req, res) => {
  try {
    const user = await AdminUser.findOne({ username: req.body.username });

    if (user && user._id.toString() !== req.params.id) {
      return res.status(409).json({ message: "Username already exists" }); // 409 Conflict is more appropriate here
    }
    await updateItem(req, res, AdminUser, "AdminUser");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
