import { useQuery, useMutation } from "@tanstack/react-query";

// Mocking the schema type based on the prompt for frontend usage
export type ConversionJob = {
  id: number;
  tool: string;
  status: "pending" | "processing" | "completed" | "failed";
  originalFilename: string;
  resultFilename: string | null;
  errorMessage: string | null;
  createdAt: string;
};

// ============================================
// API HOOKS
// ============================================

export function useCreateJob() {
  return useMutation({
    mutationFn: async ({ files, tool }: { files: File[], tool: string }) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("tool", tool);

      const res = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
        // Do NOT set Content-Type header; browser sets it automatically with the boundary for FormData
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Failed to create job" }));
        throw new Error(err.message || "Failed to create job");
      }

      return (await res.json()) as ConversionJob;
    },
  });
}

export function useJob(id: number | null) {
  return useQuery({
    queryKey: ["/api/jobs", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/jobs/${id}`);
      
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch job status");
      }
      
      return (await res.json()) as ConversionJob;
    },
    enabled: !!id,
    // Poll every 2 seconds if the job is still pending or processing
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "pending" || status === "processing") {
        return 2000;
      }
      return false;
    },
  });
}
