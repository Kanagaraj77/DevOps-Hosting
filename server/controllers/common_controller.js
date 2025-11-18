import {
  getData,
  createData,
  updateData,
  deleteData,
} from "../services/data_service.js";

export const getSingleItem = async (req, res, model) => {
  try {
    const data = await getData(model, req.params.id);
    if (!data) {
      return res.status(404).send("Data not found");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const getAllItems = async (req, res, model, query, populate) => {
  try {
    let data;
    if (query) {
      data = await getData(model, null, req.query, populate);
    } else {
      data = await getData(model, null, null, populate);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const createItem = async (req, res, model, modelName) => {
  try {
    const data = await createData(model, req.body);
    res
      .status(201)
      .json({ data, message: `${modelName} created successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something went wrong");
  }
};

export const updateItem = async (req, res, model,modelName) => {
  try {
    const data = await updateData(model, req.params.id, req.body);
    if (!data) {
      return res.status(404).send("Data not found");
    }
    res.status(200).json({ data, message: `${modelName} Updated Successfully` });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const deleteItem = async (req, res, model,modelName) => {
  try {
    const data = await deleteData(model, req.params.id);
    if (!data) {
      return res.status(404).send(`${modelName} not found`);
    }
    res.status(200).send(`${modelName} deleted successfully`);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
