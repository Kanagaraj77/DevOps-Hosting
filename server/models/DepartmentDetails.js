import mongoose from "mongoose";
import Counter from "./Counter.js";

const detailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const departmentDetailsSchema = new mongoose.Schema(
  {
    departmentDetailsId: {
      type: Number,
      unique: true,
      required: function () {
        return !this.isNew;
      },
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    details: [detailsSchema],
  },
  { timestamps: true }
);

departmentDetailsSchema.index({ departmentDetailsId: 1 });

departmentDetailsSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "departmentDetailsId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.departmentDetailsId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const departmentDetails = mongoose.model(
  "DepartmentDetails",
  departmentDetailsSchema
);

export default departmentDetails;
