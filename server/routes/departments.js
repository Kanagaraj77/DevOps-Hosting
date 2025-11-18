import express from "express";
const router = express.Router();
import Departments from "../models/Departments.js";
import { getAllItems, getSingleItem } from "../controllers/common_controller.js";
import { createDepartment, updateDepartment, deleteDepartment } from "../controllers/department_controller.js";
import validate from "../middlewares/validate.js";
import departmentSchema from "../../shared/validation/departmentSchema.js";
import limiter from "../middlewares/rateLimiter.js";
import authenticateToken from "../middlewares/authenticateToken.js";

router.get("/", (req, res) => {
    getAllItems(req, res, Departments)
})

router.get("/:id", (req, res) => {
    getSingleItem(req, res, Departments)
})

router.post("/",limiter, authenticateToken, validate(departmentSchema), createDepartment);

router.put("/:id",limiter, authenticateToken, validate(departmentSchema), updateDepartment);

router.delete("/:id", deleteDepartment);


export default router;