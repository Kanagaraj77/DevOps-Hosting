



const errMessage = "Something went wrong please try again later";


export const EditorImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.json({ url: `/uploads/editor/${req.file.filename}` });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};


