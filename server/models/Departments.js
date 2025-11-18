import mongoose from "mongoose";
import Counter from "./Counter.js";

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: Number,
      unique: true,
      required: function () {
        return !this.isNew;
      },
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Undergraduate", "Postgraduate", "Research"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

departmentSchema.index({ name: 1 });
departmentSchema.index({ departmentId: 1 });

departmentSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "departmentId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.departmentId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
