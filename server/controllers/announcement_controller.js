
import announcement from "../models/Announcement.js";
import { createItem, updateItem } from "./common_controller.js";

const errMessage = "Something went wrong please try again later";

export const updateAnnouncement = async (req, res) => {
  let isExist = await announcement.findOne();
  if (isExist) {
    try {
      req.params.id = isExist.id;
      updateItem(req, res, announcement, "Announcement");
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: errMessage }).end();
    }
  } else {
    createItem(req, res, announcement, "Announcement");
  }
};
