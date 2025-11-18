import express from "express";
import { createContactForm } from "../controllers/contactform.js";

const router = express.Router();

// GET => http://localhost:4321/api/contactform
router.post("/", createContactForm);

export default router;
