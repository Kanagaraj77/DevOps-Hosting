import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import xssClean from "xss-clean";
import helmet from "helmet";
import config from './config.js';
import dotenv from "dotenv";

dotenv.config({ path: `.env.${config.environment}` });

import connectDB from "./config/db.js";
connectDB()

const app = express();
app.use(express.static("careerresume"));
const allowedOrigins = ["http://localhost:5173","http://localhost:5174"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/api', xssClean());
app.use('/api', helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
import faculty from "./routes/faculty.js";
import adminUserRoute from "./routes/adminuser.js";
import departmentsRoute from "./routes/departments.js";
import departmentsDetailsRoute from "./routes/departmentDetails.js";
import bannerRoute from "./routes/banner.js";
import eventRoute from "./routes/event.js";
import editorUploadRoute from "./routes/editorUpload.js";
import galleryRoute from "./routes/gallery.js";
import galleryCategoryRoute from "./routes/galleryCategory.js";
import popupRoute from "./routes/popup.js";
import announcementRoute from "./routes/announcement.js";
import careerRoute from "./routes/career.js";
import careerFormRoute from "./routes/careerFormRoute.js"
import dashboard from "./routes/dashboardroute.js"
import contactFormRoute from "./routes/contactFormRoute.js"
import bannerFormRoute from "./routes/bannerFormRoute.js"
import applyNowRoute from "./routes/applynow.js"


// User Code
app.use("/api/adminuser", adminUserRoute);
app.use("/api/department", departmentsRoute);
app.use("/api/department-details", departmentsDetailsRoute);
app.use("/api/faculties", faculty);
app.use("/api/editor", editorUploadRoute);
app.use("/api/dashboard", dashboard);
app.use("/api/contactform", contactFormRoute);
app.use("/api/bannerform", bannerFormRoute);
app.use("/api/applynowform", applyNowRoute);


// User Code
app.use("/api/banner", bannerRoute);
app.use("/api/event", eventRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/gallerycategory", galleryCategoryRoute);
app.use("/api/popup", popupRoute);
app.use("/api/announcement", announcementRoute);
app.use("/api/career", careerRoute);
app.use("/api/careerform", careerFormRoute);

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "File size to large ,Submit within 2mb" });
  }
  next(err);
});

app.get("/api", (req, res) => {
  res.status(200).send("<h1>HELLO API</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
