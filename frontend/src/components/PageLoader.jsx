import { LoaderCircle, Cloud } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content flex flex-col items-center justify-center p-4 transition-colors duration-200">
      <div className="flex flex-col items-center gap-5">
        {/* Animated Icon Container */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-base-100 border border-base-300 shadow-md flex items-center justify-center">
            <Cloud
              size={30}
              className="text-indigo-600 dark:text-indigo-400 animate-pulse"
            />
          </div>
          <LoaderCircle
            size={88}
            className="absolute -inset-3 animate-spin text-indigo-500/30 stroke-[1.5]"
          />
        </div>

        {/* Text & Status */}
        <div className="text-center space-y-1">
          <h2 className="text-base font-bold text-base-content tracking-tight">
            Memory{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Cloud</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-base-content/60 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span>Loading your session...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
