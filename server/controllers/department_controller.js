import { createItem, updateItem, deleteItem } from "./common_controller.js";
import Departments from "../models/Departments.js";

/**
 * @api {post} /department Create Department
 * @apiName CreateDepartment
 * @apiGroup Department
 * @apiParam {String} name Department name
 * @apiSuccess {Object} Department created successfully
 * @apiError {Object} Department already exist
 * @apiError {Object} Something went wrong
 */
export const createDepartment = async (req, res) => {
  try {
    const isDepartmentExist = await Departments.findOne({
      name: req.body.name,
    });
    if (isDepartmentExist) {
      res.status(409).json({ message: "Department already exist" });
    } else {
      createItem(req, res, Departments, "Departments");
    }
  } catch (e) {
    console.log("Error creating department", e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const isDepartmentExist = await Departments.findOne({
      name: req.body.name,
    });
    
    if (isDepartmentExist && isDepartmentExist.id !== departmentId) {
      res.status(409).json({ message: "Department already exist" });
    } else {
      updateItem(req, res, Departments);
    }
  } catch (e) {
    console.log("Error updating department", e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await deleteItem(req, res, Departments);
  } catch (e) {
    console.log("Error deleting department", e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
