import express from "express";
import {
  createCareerForm,
  getAllCareerForms,
  getSingleCareerForm,
} from "../controllers/careerFormController.js";
import fileUploadMiddleware from "../utils/fileUpload.js";

const router = express.Router();

router.post("/", fileUploadMiddleware("/careerresume").single("file"),createCareerForm);
router.get("/", getAllCareerForms);
router.get("/:id", getSingleCareerForm);

export default router;
