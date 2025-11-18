/**
 * Retrieves data from the given model based on the parameters provided.
 * If id is given, it will find the document with that id.
 * If query is given, it will find all documents that match the query.
 * If populate is given, it will populate the given fields.
 * If none of the parameters are given, it will return all documents of the model.
 * @param {Model} model - The mongoose model to retrieve data from.
 * @param {ObjectId} [id] - The id of the document to retrieve.
 * @param {Object} [query] - The query object to filter the data.
 * @param {String} [populate] - The fields to populate.
 * @returns {Promise<Document[]>} - A promise that resolves with the retrieved data.
 */
export const getData = async (model, id, query,populate) => {
    if (id) {
      return await model.findById(id);
    }
    if(query) {
      if(populate) {
        return await model.find(query).populate(populate);
      }
      return await model.find(query);
    }
    return await model.find().populate(populate);
  };

/**
 * Creates a new document in the given model with the given data.
 * @param {Model} model - The mongoose model to create a document in.
 * @param {Object} data - The data to create a document with.
 * @returns {Promise<Document>} - A promise that resolves with the created document.
 */
  export const createData = async (model, data) => {
    return await model.create(data);
  };

  export const updateData = async (model, id, update) => {
    return await model.findByIdAndUpdate(id, update, { new: true });
  };

  export const deleteData = async (model, id) => {
    return await model.findByIdAndDelete(id);
  };

