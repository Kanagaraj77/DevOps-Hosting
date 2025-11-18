import mongoose from "mongoose";

const popupSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const banner = mongoose.model("popup", popupSchema);
export default banner;
