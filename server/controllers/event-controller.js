import { deleteItem } from "./common_controller.js";
import event from "../models/Event.js";

const errMessage = "Something went wrong please try again later";

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventData = await event.findById(eventId);

    if (!eventData) {
      return res.status(404).json({ message: "event not found" });
    }

    await deleteItem(req, res, event);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message }).end();
  }
};
export const latestEvent = async (req, res) => {
  try {
    const [eventData, newsData, highlightData] = await Promise.all([
      event.find({ category: "event" }).sort({ createdAt: -1 }).limit(3),
      event.find({ category: "news" }).sort({ createdAt: -1 }).limit(3),
      event.find({ category: "highlight" }).sort({ createdAt: -1 }).limit(10),
    ]);

    // Responding with the retrieved data
    return res.status(200).json({
      data: [
        { event: eventData },
        { news: newsData },
        { highlight: highlightData },
      ],
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message }).end();
  }
};
export const categoryWiseEvent = async (req, res) => {
  try {
    let data;
    console.log("req.params.skip", req.params.skip);
    if (req.params.skip === "noSkipId") {
      data = await event
        .find({ category: req.params.categoryname })
        .sort({ createdAt: -1 })
        .limit(req.params.limits || 0);
    } else {
      data = await event
        .find({
          category: req.params.categoryname,
          _id: { $ne: req.params.skip },
        })
        .sort({ createdAt: -1 })
        .limit(req.params.limits || 0);

      const existingIds = data.map((item) => item._id);
      if (data.length < req.params.limits) {
        const remainingLimit = req.params.limits - data.length;
        const additionalData = await event
          .find({
            category: req.params.categoryname,
            _id: { $ne: req.params.skip, $nin: existingIds }, // Exclude the already fetched documents
          })
          .sort({ createdAt: -1 })
          .limit(remainingLimit);

        // Concatenate the data from both queries to ensure the limit is respected
        data = [...data, ...additionalData];
      }
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message }).end();
  }
};

export const eventImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "No File Uploaded" });
    }
    const fileDetails = {
      filename: req.file.filename,
    };
    return res
      .status(200)
      .json({ message: "File Upload successfully", file: fileDetails });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
export const eventEditorImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.json({ url: `/uploads/editor/${req.file.filename}` });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: errMessage }).end();
  }
};
