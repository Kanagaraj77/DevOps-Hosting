import express from "express";
const router = express.Router();
import DepartmentsDetails from "../models/DepartmentDetails.js";
import { getAllItems, getSingleItem } from "../controllers/common_controller.js";
import { createDepartmentDetails, updateDepartmentDetails, deleteDepartmentDetails, getDepartmentId } from "../controllers/department_details_controller.js";


import validate from "../middlewares/validate.js";
import departmentDetailsSchema from "../../shared/validation/departmentDetailsSchema.js";
import limiter from "../middlewares/rateLimiter.js";
import authenticateToken from "../middlewares/authenticateToken.js";

router.get("/", (req, res) => {
  getAllItems(req, res, DepartmentsDetails, null, "department");
});

router.get("/:id", (req, res) => {
    getSingleItem(req, res, DepartmentsDetails)
})

router.get("/department/:id", (req, res) => {
    getDepartmentId(req, res, DepartmentsDetails)
})

router.post("/",limiter, authenticateToken, validate(departmentDetailsSchema), createDepartmentDetails);


router.post(
  "/",
  limiter,
  authenticateToken,
  validate(departmentDetailsSchema),
  createDepartmentDetails
);


router.put(
  "/:id",
  limiter,
  authenticateToken,
  validate(departmentDetailsSchema),
  updateDepartmentDetails
);

router.delete("/:id", deleteDepartmentDetails);

export default router;
