import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    content: {
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

const Announcement = mongoose.model("announcement", announcementSchema);
export default Announcement;
