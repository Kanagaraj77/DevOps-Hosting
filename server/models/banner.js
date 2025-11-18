import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  mobile: {
    type: Boolean,
    default: 0,
  },
});
const bannerSchema = new mongoose.Schema(
  {
    banner: [ImageSchema],
  },
  { timestamps: true }
);

const banner = mongoose.model("banner", bannerSchema);
export default banner;
