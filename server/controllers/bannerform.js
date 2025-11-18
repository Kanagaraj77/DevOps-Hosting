export const createBannerForm = async (req, res) => {
  try {
    const bannerForm = req.body;
    res.status(201).json({ success: true, data: bannerForm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
