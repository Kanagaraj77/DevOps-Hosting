import mongoose from "mongoose";
import Counter from "./Counter.js";

const applyNowSchema = new mongoose.Schema(
  {
    applyId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    parentNumber: {
      type: String,
      required: true,
    },
    studentNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    sslcMark: {
      type: String,
      required: true,
    },
    hscMark: {
      type: String,
      required: true,
    },
    hscMedium: {
      type: String,
      required: true,
    },
    hscSchoolName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

applyNowSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "applyId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.applyId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const applyform = mongoose.model("applyForm", applyNowSchema);

export default applyform;
