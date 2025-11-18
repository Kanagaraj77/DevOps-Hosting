import mongoose from "mongoose";
import Counter from "./Counter.js";

const facultySchema = new mongoose.Schema(
  {
    facultyId:{
      type:Number,
      unique: true,
      required: function() {
        return !this.isNew;
      },
    },
    employeeId: {
      type: Number,
      unique: true,
      required: function() {
        return !this.isNew;
      },
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    description:{
      type: String,
    },
    image: {
        type: String,
        // required: true,
      },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

facultySchema.index({ employeeId: 1 });
facultySchema.index({ facultyId: 1 });

facultySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "facultyId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.facultyId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
