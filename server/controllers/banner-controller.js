// const { bannerSchema } = require("../../shared/validation/bannerSchema");

import banner from "../models/banner.js";
import { createItem, updateItem } from "./common_controller.js";

const errMessage = "Something went wrong please try again later";

export const updateBanner = async (req, res) => {
//   await bannerSchema.validate(req.body, { abortEarly: false });
  let isExist = await banner.findOne();
  if (isExist) {
    try {
      req.params.id = isExist.id;
      updateItem(req, res, banner, "Banner");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: errMessage }).end();
    }
  } else {
    createItem(req, res, banner, "Banner");
  }
};

export const bannerImageUpload = async (req, res) => {
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


