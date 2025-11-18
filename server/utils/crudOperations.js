// get data
const getData = async (modelName) => {
  try {
    return await modelName.find();
  } catch (err) {
    throw err;
  }
};

// get single data
const getOneData = async (modelName, id) => {
  try {
    return await modelName.findById(id);
  } catch (err) {
    throw err;
  }
};

// post  data
const postData = async (modelName, req) => {
  try {
    await modelName.create(req.body);
  } catch (err) {
    throw err;
  }
};
// post one data
const postOneData = async (modelName, id, body) => {
  try {
    const updatedBrand = await modelName.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedBrand) {
      throw new Error(`${modelName} not found`);
    }

    return updatedBrand;
  } catch (err) {
    throw err;
  }
};

// delete one data
const deleteOneData = async (modelName, id) => {
  try {
    const data = await modelName.findById(id);
    if (!data) {
      throw new Error(`${modelName} not found`);
    }
    await data.deleteOne();
    return;
  } catch (err) {
    throw err;
  }
};

export default {
  getData,
  getOneData,
  postData,
  postOneData,
  deleteOneData,
};
