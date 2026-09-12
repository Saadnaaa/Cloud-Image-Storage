import { useState } from "react";
import toast from "react-hot-toast";
import {
  ImagePlus,
  PlusCircle,
  LoaderCircle,
  Type,
  FileText,
  Image as ImageIcon,
  X,
} from "lucide-react";
import useMemory from "../hooks/useMemory.js";

const CreateMemory = () => {
  const { addMemory } = useMemory();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const [creatingMemory, setCreatingMemory] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((previousFormData) => ({
        ...previousFormData,
        imageUrl: reader.result,
      }));
    };

    reader.readAsDataURL(selectedImage);
  };

  const removeSelectedImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Title is required");
    }

    try {
      setCreatingMemory(true);
      await addMemory(formData);
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
      });
      toast.success("Memory created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create memory");
    } finally {
      setCreatingMemory(false);
    }
  };

  return (
    <section className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 md:p-8 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-200">
        <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <PlusCircle size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-base-content">
            Create New Memory
          </h2>
          <p className="text-xs text-base-content/60">
            Capture and save a memorable moment
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-base-content/80 mb-1.5">
            Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/40">
              <Type size={18} />
            </div>
            <input
              type="text"
              name="title"
              placeholder="Give your memory a title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 text-sm transition"
              required
            />
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-semibold text-base-content/80 mb-1.5">
            Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-3.5 pointer-events-none text-base-content/40">
              <FileText size={18} />
            </div>
            <textarea
              name="description"
              rows="3"
              placeholder="What made this moment special?"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-base-200 border border-base-300 rounded-xl text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 text-sm transition resize-none"
            />
          </div>
        </div>

        {/* Image Upload Area */}
        <div>
          <label className="block text-sm font-semibold text-base-content/80 mb-1.5">
            Upload Image
          </label>

          {formData.imageUrl ? (
            <div className="relative rounded-xl overflow-hidden border border-base-300 group max-h-60 bg-base-200 flex items-center justify-center">
              <img
                src={formData.imageUrl}
                alt="Memory Preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={removeSelectedImage}
                className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition cursor-pointer"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-base-300 rounded-xl cursor-pointer bg-base-200/50 hover:bg-base-200 hover:border-indigo-500/50 transition group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="p-2.5 bg-base-100 rounded-full shadow-sm text-base-content/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2 transition">
                  <ImagePlus size={22} />
                </div>
                <p className="text-xs font-semibold text-base-content/80">
                  Click to upload{" "}
                  <span className="font-normal text-base-content/40">
                    or drag & drop
                  </span>
                </p>
                <p className="text-[11px] text-base-content/40 mt-1">
                  PNG, JPG, WEBP or GIF
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={creatingMemory}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-indigo-100 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
        >
          {creatingMemory ? (
            <>
              <LoaderCircle className="animate-spin" size={18} />
              <span>Saving Memory...</span>
            </>
          ) : (
            <>
              <ImageIcon size={18} />
              <span>Save Memory</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateMemory;
