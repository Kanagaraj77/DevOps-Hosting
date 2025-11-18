import { deleteItem } from "./common_controller.js";
import Faculty from "../models/Faculty.js";

const errMessage = "Something went wrong please try again later";

export const deleteFaculty = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const facultyData = await Faculty.findById(facultyId);

    if (!facultyData) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    await deleteItem(req, res, Faculty);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message }).end();
  }
};

export const facultyImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "No File Uploaded" });
    }
    const fileDetails = {
      filename: req.file.filename,
    };
    return res
      .status(200)
      .json({ message: "File Upload successfully", file: fileDetails });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const facultyEditorImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.json({ url: `/uploads/editor/${req.file.filename}`});
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};

export const getFacultyId = async (req, res) => {
  try {
    const facultyId = await Faculty.find({
      'department': req.params.id
    });

    if (facultyId) {
      res.status(200).json({ message: "Success", department: facultyId });
    } else {
      console.log("Faculty not found");
      res.status(404).json({ message: "Faculty not found" });
    }
  }catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}