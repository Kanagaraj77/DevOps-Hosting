import mongoose from "mongoose";
import Counter from "./Counter.js";

const gallerySchema = new mongoose.Schema(
  {
    galleryId: {
      type: Number,
      unique: true,
      required: function () {
        return !this.isNew;
      },
    },
    name: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "galleryCategory",
    },
    images: {
      type: [String],
    },
    status: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

gallerySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "galleryId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.galleryId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const gallery = mongoose.model("gallery", gallerySchema);
export default gallery;
