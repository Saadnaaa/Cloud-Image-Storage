import { useState } from "react";
import { Trash2, Calendar, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import useMemory from "../hooks/useMemory";

const MemoryCard = ({ memory }) => {
  const { removeMemory } = useMemory();
  const [showMemory, setShowMemory] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await removeMemory(memory._id);
      setShowMemory(false);
      toast.success("Memory deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete memory");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!showMemory) {
    return null;
  }

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col group">
      {/* Card Image */}
      {memory.imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden bg-base-200">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-base-200 flex items-center justify-center text-base-content/40">
          <span className="text-xs font-medium">No Image Provided</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-base-content group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition duration-200 line-clamp-1">
            {memory.title}
          </h3>

          {memory.description ? (
            <p className="mt-2 text-sm text-base-content/70 line-clamp-3 leading-relaxed">
              {memory.description}
            </p>
          ) : (
            <p className="mt-2 text-xs italic text-base-content/40">
              No description added.
            </p>
          )}
        </div>

        {/* Card Action Footer */}
        <div className="mt-5 pt-4 border-t border-base-200 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-base-content/50">
            <Calendar size={14} />
            {memory.createdAt
              ? new Date(memory.createdAt).toLocaleDateString()
              : "Recent"}
          </span>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? (
              <LoaderCircle size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
