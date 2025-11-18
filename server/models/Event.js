import mongoose from "mongoose";
import Counter from "./Counter.js";

const eventSchema = new mongoose.Schema(
  {
    eventId: {
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
    location: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["event", "news", "highlight"],
    },
    intro: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: String,
      required: true,
    },
    pagetitle: {
      type: String,
    },
    metades: {
      type: String,
    },
    metakey: {
      type: String,
    },
    date: {
      type: Date,
      
    },

    status: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

eventSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "eventId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.eventId = counter.sequenceValue;
      next();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const event = mongoose.model("event", eventSchema);
export default event;
