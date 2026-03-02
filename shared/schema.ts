import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversionJobs = pgTable("conversion_jobs", {
  id: serial("id").primaryKey(),
  tool: text("tool").notNull(),
  status: text("status").notNull().default("pending"),
  originalFilename: text("original_filename").notNull(),
  resultFilename: text("result_filename"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJobSchema = createInsertSchema(conversionJobs).omit({ id: true, createdAt: true });

export type ConversionJob = typeof conversionJobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type CreateJobRequest = {
  tool: string;
};

export type UpdateJobRequest = Partial<InsertJob>;
export type JobResponse = ConversionJob;
