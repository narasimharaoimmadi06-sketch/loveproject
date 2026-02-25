import { db } from "./db";
import {
  conversionJobs,
  type ConversionJob,
  type InsertJob,
  type UpdateJobRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getJob(id: number): Promise<ConversionJob | undefined>;
  createJob(job: InsertJob): Promise<ConversionJob>;
  updateJob(id: number, updates: UpdateJobRequest): Promise<ConversionJob>;
}

export class DatabaseStorage implements IStorage {
  async getJob(id: number): Promise<ConversionJob | undefined> {
    const [job] = await db.select().from(conversionJobs).where(eq(conversionJobs.id, id));
    return job;
  }

  async createJob(insertJob: InsertJob): Promise<ConversionJob> {
    const [job] = await db.insert(conversionJobs).values(insertJob).returning();
    return job;
  }

  async updateJob(id: number, updates: UpdateJobRequest): Promise<ConversionJob> {
    const [updated] = await db.update(conversionJobs)
      .set(updates)
      .where(eq(conversionJobs.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
