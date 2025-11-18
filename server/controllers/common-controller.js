const { getData, createData, updateData, deleteData } = require('../services/data_service');


const getSingleItem = async (req, res, model) => {
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

const getAllItems = async (req, res, model, query) => {
    try {
        let data;
        if (query) {
            data = await getData(model, null, req.query);
        }else {
            data = await getData(model);
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};

const createItem = async (req, res, model, modelName) => {
    try {
        const data = await createData(model, req.body);
        res.status(201).json({data,message:`${modelName} created successfully`});
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong");
    }
};

const updateItem = async (req, res, model,modelName) => {
    try {
        const data = await updateData(model, req.params.id, req.body);
        if (!data) {
            return res.status(404).send("Data not found");
        }
        res.status(200).json({data,message:`${modelName} Updated Successfully`});
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};

const deleteItem = async (req, res, model) => {
    try {
        const data = await deleteData(model, req.params.id);
        if (!data) {
            return res.status(404).send("Data not found");
        }
        res.status(200).send("Data deleted successfully");
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};

module.exports = {
    getSingleItem,
    getAllItems,
    createItem,
    updateItem,
    deleteItem
};