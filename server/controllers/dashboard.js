import AdminUser from "../models/Adminuser.js";
import Event from "../models/Event.js";

export const all = async (req, res) => {
  try {
    const getUser = await AdminUser.find();
    const user = getUser.length;
    const getEvent = await Event.aggregate([
      {
        $match: {
          category: { $in: ["event", "news", "highlight"] },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    const eventsByCategory = getEvent.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});
    res.status(200).json({
      success: true,
      data: {
        user,
        eventsByCategory,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
