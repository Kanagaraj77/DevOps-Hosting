import mongoose from "mongoose";
/**
 * Connects to the MongoDB database using the replica set rs0.
 * @return {Promise} - Resolves when the connection is established.
 */
let connectDB = async () => {
  await mongoose
    .connect(
      "mongodb://localhost:27017/ucas"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting:", err));
};

export default connectDB;
