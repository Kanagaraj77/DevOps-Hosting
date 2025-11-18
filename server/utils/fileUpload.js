import multer from "multer";
import path from "path";

const fileUploadMiddleware = (destinationPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads" + destinationPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /pdf|doc|docx/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc, and .docx files are allowed!"));
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
};

export default fileUploadMiddleware;
