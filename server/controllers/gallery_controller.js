import gallery from "../models/Gallery.js";
import { createItem, updateItem } from "./common_controller.js";

const errMessage = "Something went wrong please try again later";

export const createGallery = async (req, res) => {
  try {
    const isExist = await gallery.findOne({ name: req.body.name });
    if (isExist) {
      return res.status(409).json({ message: "This category already in use" });
    }
    createItem(req, res, gallery, "Gallery");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const updateGallery = async (req, res) => {
  try {
    const isExist = await gallery.findOne({ name: req.body.name });
    if (isExist && isExist._id.toString() !== req.params.id) {
      return res.status(409).json({ message: "Gallery name already exists" });
    }
    updateItem(req, res, gallery, "Gallery");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const recentGallery = async (req, res) => {
  try {
    const reactGallerys = [];
    const galleryData = await gallery.find();
    if (galleryData.length) {
      const sortedData = [...galleryData].sort((a, b) => {
        const dateA = new Date(a.createdat);
        const dateB = new Date(b.createdat);
        return dateB - dateA;
      });

      sortedData.forEach((gallery) => {
        if (gallery.images.length > 0) {
          gallery.images.forEach((image) => {
            if (reactGallerys.length < 9) {
              reactGallerys.push(image);
            }
          });
        }
      });
    }
    return res.status(200).json(reactGallerys);
  } catch (error) {}
};
export const editImageGallery = async (req, res) => {
  try {
    const { id, index, imgurl } = req.body;
    const galleryData = await gallery.findById(id);

    if (!galleryData) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    if (index < 0 || index > galleryData.images.length) {
      return res.status(404).json({ message: "Invalid index value" });
    }

    galleryData.images[index] = imgurl;

    await galleryData.save();

    return res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: err.message }).end();
  }
};
