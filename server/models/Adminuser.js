import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Counter from "./Counter.js";

const adminUserSchema = new mongoose.Schema({
  adminId: {
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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admintype: {
    type: String,
    enum: ["admin", "secondary"],
    default: "admin",
  },
  status:{
    type: Boolean,
    default: 1,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
});

adminUserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      return next(error); // Pass error to the next middleware
    }
  }

  if (user.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { sequenceName: "adminId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      user.adminId = counter.sequenceValue;
    } catch (err) {
      return next(err); 
    }
  }

  next(); 
});


adminUserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.password || typeof update.password !== "string") return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(update.password, salt);
    update.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
const AdminUser = mongoose.model("AdminUser", adminUserSchema);
export default AdminUser;
