import { useContext } from "react";
import { MemoryContext } from "../context/MemoryContext.jsx";

const useMemory = () => {
  return useContext(MemoryContext);
};

export default useMemory;
