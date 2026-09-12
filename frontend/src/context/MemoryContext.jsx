import { createContext, useState } from "react";
import {
  createMemory,
  deleteMemory,
  getMemories,
} from "../services/memory.api";

export const MemoryContext = createContext();

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMemories = async () => {
    try {
      setLoading(true);
      const data = await getMemories();
      setMemories(data.memories);
    } finally {
      setLoading(false);
    }
  };

  const addMemory = async (memeoryData) => {
    const data = await createMemory(memeoryData);
    setMemories((previousMemories) => [data.memory, ...previousMemories]);
  };

  const removeMemory = async (memoryId) => {
    await deleteMemory(memoryId);
    setMemories((previousMemories) =>
      previousMemories.filter((memory) => memory._id !== memoryId),
    );
  };
  return (
    <MemoryContext.Provider
      value={{
        memories,
        loading,
        loadMemories,
        addMemory,
        removeMemory,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};
