import { createItem, updateItem, deleteItem } from "./common_controller.js";
import DepartmentDetails from "../models/DepartmentDetails.js";

export const createDepartmentDetails = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const isDepartmentExist = await DepartmentDetails.findOne({
        department: req.body.department,
    });
    if (isDepartmentExist) {
      res.status(409).json({ message: "Department already exist" });
    } else {
      createItem(req, res, DepartmentDetails, "Department Details");
    }
  } catch (e) {
    console.log("Error creating department details", e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateDepartmentDetails = async (req, res) => {
  try {
    // const departmentDetailsId = req.params.id;

    const isDepartmentExist = await DepartmentDetails.findOne({
      department: req.body.department,
    });
    console.log("isDepartmentExist", isDepartmentExist.department);
    console.log("Current Department", req.body.department);
    if (isDepartmentExist && isDepartmentExist.department != req.body.department) {
      res.status(409).json({ message: "Department already exist" });
    } else {
      updateItem(req, res, DepartmentDetails);
    }
  } catch (e) {
    console.log("Error updating department", e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteDepartmentDetails = async (req, res) => {
  try {
    await deleteItem(req, res, DepartmentDetails);
  } catch (e) {
    console.log("Error deleting Department Details", e.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getDepartmentId = async (req, res) => {
  try {
    const departmentId = await DepartmentDetails.findOne({
      'department': req.params.id
    });

    if (departmentId) {
      res.status(200).json({ message: "Success", department: departmentId });
    } else {
      console.log("Department not found");
      res.status(404).json({ message: "Department not found" });
    }
  }catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}