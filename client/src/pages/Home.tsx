import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FileDropzone } from "@/components/FileDropzone";
import { ToolGrid, TOOLS } from "@/components/ToolGrid";
import { useCreateJob, useJob } from "@/hooks/use-jobs";
import { Loader2, CheckCircle2, AlertCircle, Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [activeJobId, setActiveJobId] = useState<number | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  
  const { toast } = useToast();
  const createJob = useCreateJob();
  const { data: job, isLoading: isPolling, isError } = useJob(activeJobId);

  useEffect(() => {
    if (job?.status === "completed") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#8E84D1', '#6C63FF']
      });
    }
  }, [job?.status]);

  const handleToolSelect = async (toolId: string) => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select or drop files first before choosing a tool.",
        variant: "destructive"
      });
      return;
    }

    setSelectedTool(toolId);
    
    try {
      const result = await createJob.mutateAsync({ files, tool: toolId });
      setActiveJobId(result.id);
    } catch (error: any) {
      toast({
        title: "Conversion Failed",
        description: error.message || "Failed to start the conversion process.",
        variant: "destructive"
      });
      setSelectedTool(null);
    }
  };

  const resetState = () => {
    setFiles([]);
    setActiveJobId(null);
    setSelectedTool(null);
  };

  const isConverting = activeJobId !== null && (job?.status === "pending" || job?.status === "processing");
  const isSuccess = job?.status === "completed";
  const isFailed = job?.status === "failed" || isError;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#5A51C6]/30 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight"
          >
            Narasimharao
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg md:text-xl font-medium"
          >
            Convert your files with elegance.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!activeJobId && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 flex flex-col items-center"
            >
              <FileDropzone files={files} onFilesChange={setFiles} />
              
              <div className="w-full pt-4">
                <ToolGrid 
                  onSelectTool={handleToolSelect} 
                  disabled={createJob.isPending} 
                />
              </div>
            </motion.div>
          )}

          {isConverting && (
            <motion.div
              key="converting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-16 flex flex-col items-center justify-center text-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                <Loader2 className="w-16 h-16 text-white animate-spin relative z-10" />
              </div>
              <h3 className="text-2xl font-bold mt-8 mb-2">Processing your files...</h3>
              <p className="text-white/70">
                Using {TOOLS.find(t => t.id === selectedTool)?.name}. This usually takes a few seconds.
              </p>
            </motion.div>
          )}

          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.1 }}
                className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-green-300" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-3">Conversion Complete!</h3>
              <p className="text-white/80 mb-8 max-w-md">
                Your file <span className="font-semibold text-white">{job?.resultFilename || 'result.pdf'}</span> is ready for download.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a 
                  href={`/api/jobs/${activeJobId}/download`}
                  download
                  className="solid-white-button flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg"
                >
                  <Download className="w-5 h-5" />
                  Download File
                </a>
                <button 
                  onClick={resetState}
                  className="glass-button flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Convert Another
                </button>
              </div>
            </motion.div>
          )}

          {isFailed && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-red-400/20 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-12 h-12 text-red-300" />
              </div>
              
              <h3 className="text-3xl font-bold mb-3">Something went wrong</h3>
              <p className="text-white/80 mb-8 max-w-md">
                {job?.errorMessage || "An unexpected error occurred during conversion."}
              </p>

              <button 
                onClick={resetState}
                className="solid-white-button px-8 py-3 rounded-xl text-lg flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back & Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-white/50 text-sm font-medium tracking-wide flex flex-col items-center gap-4"
      >
        <div>Minimal. Fast. Secure.</div>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
        </div>
      </motion.div>
    </main>
  );
}
