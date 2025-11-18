import mongoose from "mongoose";
import Counter from "./Counter.js";

const CareerSchema = new mongoose.Schema(
  {
    careerId: {
      type: Number,
      unique: true,
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    applyfor: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

CareerSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "careerId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.careerId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const careerform = mongoose.model("careerForm", CareerSchema);

export default careerform;
