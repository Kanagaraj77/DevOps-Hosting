// const { bannerSchema } = require("../../shared/validation/bannerSchema");

import popup from "../models/Popup.js";
import { createItem, updateItem } from "./common_controller.js";

const errMessage = "Something went wrong please try again later";

export const updatePopup = async (req, res) => {
  //   await bannerSchema.validate(req.body, { abortEarly: false });
  let isExist = await popup.findOne();
  if (isExist) {
    try {
      req.params.id = isExist.id;
      updateItem(req, res, popup, "Popup");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: errMessage }).end();
    }
  } else {
    createItem(req, res, popup, "Popup");
  }
};
