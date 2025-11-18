import galleryCategory from "../models/GalleryCategory.js";
import { createItem, deleteItem, updateItem } from "./common_controller.js";
import gallery from "../models/Gallery.js";
const errMessage = "Something went wrong please try again later";

export const createGalleryCategory = async (req, res) => {
  try {
    const isExist = await galleryCategory.findOne({ name: req.body.name });
    if (isExist) {
      return res.status(409).json({ message: "Category name already exists" });
    }
    await createItem(req, res, galleryCategory, "Gallery Category");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const updateGalleryCategory = async (req, res) => {
  try {
    const isExist = await galleryCategory.findOne({ name: req.body.name });
    if (isExist && isExist._id.toString() !== req.params.id) {
      return res.status(409).json({ message: "Category name already exists" });
    }
    await updateItem(req, res, galleryCategory, "Gallery Category");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const deleteGalleryCategory = async (req, res) => {
  try {
    const galleryActive = await gallery.findOne({name:req.params.id});

    if(galleryActive){
      throw new Error("This gallery category is in use and cannot be deleted right now");
    }

    await deleteItem(req, res, galleryCategory,"Gallery Category");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message }).end();
  }
};
