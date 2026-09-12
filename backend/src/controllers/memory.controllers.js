import cloudinary from "../config/cloudinary.js";
import { Memory } from "../models/memory.model.js";

export const createMemory = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body || {};
    const loggedInUserId = req.user._id;

    if (!title || !imageUrl) {
      return res.status(400).json({
        message: "Please provide title and image",
      });
    }

    const uploadedResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: "memory-cloud",
      resource_type: "image",
    });

    const newMemory = await Memory.create({
      title,
      imageUrl: uploadedResponse.secure_url,
      description: description || "",
      cloudinaryId: uploadedResponse.public_id,
      user: loggedInUserId,
    });

    const memory = await Memory.findById(newMemory._id).populate(
      "user",
      "username",
    );

    res.status(201).json({ message: "Memory created successfully", memory });
  } catch (error) {
    console.log("Error in createMemory controller", error);

    if (error?.http_code === 403 || error?.statusCode === 403) {
      return res.status(502).json({
        message:
          "Cloudinary rejected the upload. Please verify your Cloudinary API key, secret, and account permissions.",
      });
    }

    const statusCode =
      error?.http_code === 400 ||
      error?.statusCode === 400 ||
      error?.http_code === 401 ||
      error?.statusCode === 401
        ? 400
        : 500;

    res.status(statusCode).json({
      message:
        error?.message ||
        "Image upload failed. Please check Cloudinary configuration.",
    });
  }
};

export const getMemories = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const memories = await Memory.find({ user: loggedInUserId })
      .sort({
        createdAt: -1,
      })
      .populate("user", "username");
    res
      .status(200)
      .json({ message: "Memories fetched successfully", memories });
  } catch (error) {
    console.log("Error in getMemories controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user._id;
    const memory = await Memory.findOne({ _id: id, user: loggedInUserId });

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    // Delete the actual image from Cloudinary
    await cloudinary.uploader.destroy(memory.cloudinaryId);
    await memory.deleteOne();
    res.status(200).json({ message: "Memory deleted successfully" });
  } catch (error) {
    console.log("Error in deleteMemory controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
