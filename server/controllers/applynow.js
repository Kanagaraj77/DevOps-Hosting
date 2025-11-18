import applyForm from "../models/applynowmodel.js";

export const createApplyForm = async (req, res) => {
  try {
    const data = new applyForm(req.body);
    await data.save();
    res.status(201).json({ message: "created successfully", data: data });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const getAllApplyForms = async (req, res) => {
  try {
    const data = await applyForm.find();
    if (!data || data.length === 0) {
      return res.status(200).send([]);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const getAllApplyFormsById = async (req, res) => {
  try {
    const data = await applyForm.findById(req.params.id);
    if (!data) {
      return res
        .status(200)
        .json({ success: false, message: "data not found" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
