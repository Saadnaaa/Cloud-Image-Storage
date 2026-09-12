import { useEffect } from "react";
import toast from "react-hot-toast";
import { LogOut, Cloud, Sparkles, LoaderCircle, Inbox } from "lucide-react";

import CreateMemory from "../components/CreateMemory";
import MemoryCard from "../components/MemoryCard";

import useMemory from "../hooks/useMemory.js";
import useAuth from "../hooks/useAuth.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

const Home = () => {
  const { memories, loading, loadMemories } = useMemory();
  const { authUser, logout } = useAuth();

  useEffect(() => {
    const loadMemoryData = async () => {
      try {
        await loadMemories();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load memories");
      }
    };

    loadMemoryData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content antialiased transition-colors duration-200">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-base-100/80 backdrop-blur-md border-b border-base-300 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-sm">
              <Cloud size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-base-content">
              Memory{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Cloud
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-base-200 rounded-full border border-base-300">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-semibold text-base-content/80">
                {authUser?.fullname || authUser?.username || "User"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 py-2 px-3.5 bg-base-200 hover:bg-rose-500/10 text-base-content/80 hover:text-rose-500 rounded-xl text-xs font-semibold border border-base-300 hover:border-rose-500/30 transition duration-200 cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Memory Creation Form Container */}
        <div className="max-w-2xl mx-auto">
          <CreateMemory />
        </div>

        {/* Memory Display Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-base-300">
            <div className="flex items-center gap-2">
              <Sparkles
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />
              <h2 className="text-xl font-bold text-base-content">
                My Memories
              </h2>
            </div>
            {memories && (
              <span className="text-xs font-medium px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-500/20">
                {memories.length} {memories.length === 1 ? "Item" : "Items"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-base-content/50 gap-3">
              <LoaderCircle
                size={32}
                className="animate-spin text-indigo-600 dark:text-indigo-400"
              />
              <p className="text-sm font-medium">
                Loading your precious memories...
              </p>
            </div>
          ) : !memories || memories.length === 0 ? (
            <div className="py-16 bg-base-100 rounded-2xl border border-base-300 text-center flex flex-col items-center justify-center px-4">
              <div className="p-4 bg-base-200 text-base-content/40 rounded-full mb-3">
                <Inbox size={32} />
              </div>
              <h3 className="text-base font-semibold text-base-content">
                No memories found
              </h3>
              <p className="text-xs text-base-content/60 max-w-sm mt-1">
                Start by creating your first memory using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((memory) => (
                <MemoryCard key={memory._id} memory={memory} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
