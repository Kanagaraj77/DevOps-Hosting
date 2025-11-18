import express from "express";
const router = express.Router();
import Auth from "../controllers/authentication.js";
import AdminUser from "../models/Adminuser.js";
import {
  deleteItem,
  getAllItems,
  getSingleItem,
} from "../controllers/common_controller.js";
import {
  adminUserLogin,
  createAdminUser,
  loginUserData,
  updateAdminUser,
} from "../controllers/adminuser_controller.js";
import limiter from "../middlewares/rateLimiter.js";
import authenticateToken from "../middlewares/authenticateToken.js";
const errMessage = "Something went wrong please try again later";

//! Login
router.post("/login", adminUserLogin);

router.get("/getcurrentuser", Auth, loginUserData);

//! Get All User Data
router.get("/", (req, res) => getAllItems(req, res, AdminUser, false));

//! Get Single User data
router.get("/:id", (req, res) =>
  getSingleItem(req, res, AdminUser, "AdminUser")
);

//! Add  User data
router.post("/", limiter, authenticateToken, createAdminUser);

//! Edit User data
router.put("/:id", limiter, authenticateToken, updateAdminUser);

//! Delete User
router.delete("/:id", (req, res) =>
  deleteItem(req, res, AdminUser, "AdminUser")
);

export default router;
