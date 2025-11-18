import mongoose from "mongoose";
import Counter from "./Counter.js";

const galleryCategorySchema = new mongoose.Schema(
  {
    galleryCategoryId: {
      type: Number,
      unique: true,
      required: function () {
        return !this.isNew;
      },
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

galleryCategorySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "galleryCategoryId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.galleryCategoryId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const galleryCategory = mongoose.model(
  "galleryCategory",
  galleryCategorySchema
);
export default galleryCategory;
