import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export function FileDropzone({ files, onFilesChange, maxFiles = 10 }: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Append new files up to maxFiles limit
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      onFilesChange(newFiles);
    },
    [files, onFilesChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const removeFile = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden group
          border-2 border-dashed rounded-2xl p-8 md:p-12
          transition-all duration-300 ease-out cursor-pointer
          flex flex-col items-center justify-center min-h-[200px]
          ${
            isDragActive
              ? "border-white bg-white/20 scale-[1.02]"
              : "border-white/40 bg-white/5 hover:bg-white/10 hover:border-white/60"
          }
        `}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {files.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="w-8 h-8 md:w-12 md:h-12 text-white/90" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-medium">Click or drag to select files</p>
                <p className="text-sm text-white/60 mt-2">Supports PDF, Images, Word documents</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="files"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="p-3 bg-white/20 rounded-full mb-4">
                <FileIcon className="w-8 h-8 text-white" />
              </div>
              <p className="text-xl font-medium mb-1">
                {files.length} file{files.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-white/70 mb-6">Click or drag to add more</p>
              
              <div className="w-full max-w-md space-y-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {files.map((file, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between bg-white/10 border border-white/10 p-3 rounded-xl backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <FileIcon className="w-5 h-5 text-white/70 shrink-0" />
                        <span className="text-sm truncate font-medium">{file.name}</span>
                      </div>
                      <button
                        onClick={(e) => removeFile(i, e)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
