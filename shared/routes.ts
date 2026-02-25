import { z } from 'zod';
import { insertJobSchema, conversionJobs } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  jobs: {
    create: {
      method: 'POST' as const,
      path: '/api/jobs' as const,
      // Input is multipart/form-data with `files` and `tool` string
      responses: {
        201: z.custom<typeof conversionJobs.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/jobs/:id' as const,
      responses: {
        200: z.custom<typeof conversionJobs.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    download: {
      method: 'GET' as const,
      path: '/api/jobs/:id/download' as const,
      responses: {
        200: z.any(), // File stream
        404: errorSchemas.notFound,
      },
    },
  },
};

// ============================================
// REQUIRED: buildUrl helper
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type JobResponse = z.infer<typeof api.jobs.get.responses[200]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
export type NotFoundError = z.infer<typeof errorSchemas.notFound>;
export type InternalError = z.infer<typeof errorSchemas.internal>;
