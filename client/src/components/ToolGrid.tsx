import React from "react";
import { Image as ImageIcon, FileText, File, Layers, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";

export type Tool = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export const TOOLS: Tool[] = [
  { id: "images-to-pdf", name: "Images to PDF", icon: <ImageIcon className="w-5 h-5 mb-2" /> },
  { id: "pdf-to-image", name: "PDF to Image", icon: <FileText className="w-5 h-5 mb-2" /> },
  { id: "pdf-to-word", name: "PDF to Word", icon: <File className="w-5 h-5 mb-2" /> },
  { id: "pdf-merge", name: "PDF Merge", icon: <Layers className="w-5 h-5 mb-2" /> },
  { id: "compress-pdf", name: "Compress PDF", icon: <Minimize2 className="w-5 h-5 mb-2" /> },
];

interface ToolGridProps {
  onSelectTool: (toolId: string) => void;
  disabled?: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function ToolGrid({ onSelectTool, disabled = false }: ToolGridProps) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
    >
      {TOOLS.map((tool, index) => (
        <motion.button
          key={tool.id}
          variants={item}
          onClick={() => onSelectTool(tool.id)}
          disabled={disabled}
          className={`
            solid-white-button flex flex-col items-center justify-center p-4 rounded-2xl
            ${index === 4 ? "col-span-2 md:col-span-4 md:max-w-[50%] mx-auto w-full mt-2" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed transform-none hover:shadow-none hover:translate-y-0" : ""}
          `}
        >
          {tool.icon}
          <span className="text-sm font-bold tracking-wide">{tool.name}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
