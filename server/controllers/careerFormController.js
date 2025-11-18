import careerform from "../models/CareerForm.js";

// export const createCareerForm = async (req, res) => {
//   try {
//     const data = new careerform(req.body);
//     await data.save();
//     res.status(201).json({ message: "created successfully", data: data });
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// };

export const createCareerForm = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const { filename } = req.file;
    const formData = { ...req.body, resume: filename };

    const data = new careerform(formData);
    await data.save();
    res.status(201).json({ message: "Form submitted successfully", data });
  } catch (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: "File size is too large, Submit within 2MB" });
    }
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const getSingleCareerForm = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await careerform.findById(id);
    if (!data) {
      return res.status(200).send([]);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const getAllCareerForms = async (req, res) => {
  try {
    const data = await careerform.find();
    if (!data || data.length === 0) {
      return res.status(200).send([]);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
