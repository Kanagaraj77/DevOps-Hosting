import express from "express";

import createMulterMiddleware from "../utils/upload.js";

import { EditorImageUpload } from "../controllers/editorUpload_controller.js";

const router = express.Router();

// Handle file upload route
router.post(
  "/editor-upload",
  createMulterMiddleware("public/uploads/editor").single("files[0]"),
  EditorImageUpload
);

export default router;
