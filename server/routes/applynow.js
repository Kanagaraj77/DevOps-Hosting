import express from "express";
import { createApplyForm, getAllApplyForms, getAllApplyFormsById } from "../controllers/applynow.js";

const router = express.Router();

router.post("/", createApplyForm);
router.get("/", getAllApplyForms);
router.get("/:id", getAllApplyFormsById);

export default router;
