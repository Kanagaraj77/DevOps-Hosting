import mongoose from "mongoose";
import Counter from "./Counter.js";

const careerSchema = new mongoose.Schema(
  {
    careerId: {
      type: Number,
      unique: true,
      required: function () {
        return !this.isNew;
      },
    },
    title: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
    },
    location: {
      type: String,
    },
    intro: {
      type: String,
    },
    experience: {
      type: String,
    },
    openings: {
      type: String,
    },
    salary: {
      type: String,
    },
    shift: {
      type: String,
    },
    jobtype: {
      type: String,
    },
    benefit: {
      type: String,
    },
    paytype: {
      type: String,
    },
    roles: {
      type: String,
    },
    skills: {
      type: String,
    },
    jobdescription: {
      type: String,
    },

    status: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

careerSchema.pre("save", async function (next) {
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

const career = mongoose.model("career", careerSchema);
export default career;
