import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import os from "os";
import { PDFDocument } from 'pdf-lib';

// Configure multer for file uploads
const upload = multer({ dest: os.tmpdir() });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.jobs.create.path, upload.array('files'), async (req, res) => {
    try {
      const tool = req.body.tool;
      const files = req.files as Express.Multer.File[];
      
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded", field: "files" });
      }
      if (!tool) {
        return res.status(400).json({ message: "Tool not specified", field: "tool" });
      }

      const file = files[0];
      
      const job = await storage.createJob({
        tool,
        originalFilename: file.originalname,
        status: "processing"
      });

      processJob(job.id, file, tool).catch(console.error);

      res.status(201).json(job);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.jobs.get.path, async (req, res) => {
    const job = await storage.getJob(Number(req.params.id));
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  });

  app.get(api.jobs.download.path, async (req, res) => {
    const job = await storage.getJob(Number(req.params.id));
    if (!job || !job.resultFilename) {
      return res.status(404).json({ message: 'File not found or not ready' });
    }
    
    const filePath = path.join(os.tmpdir(), job.resultFilename);
    try {
      await fs.access(filePath);
      res.download(filePath, job.resultFilename);
    } catch {
      res.status(404).json({ message: 'File no longer exists on server' });
    }
  });

  return httpServer;
}

async function processJob(jobId: number, file: Express.Multer.File, tool: string) {
  try {
    const resultExt = tool.includes('pdf') ? '.pdf' : '.png';
    const resultFilename = `processed_${jobId}_${file.originalname}${resultExt}`;
    const resultPath = path.join(os.tmpdir(), resultFilename);

    if (tool === 'images-to-pdf') {
      const imgBytes = await fs.readFile(file.path);
      const pdfDoc = await PDFDocument.create();
      let image;
      
      const lowerName = file.originalname.toLowerCase();
      if (lowerName.endsWith('.png')) {
        image = await pdfDoc.embedPng(imgBytes);
      } else if (lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) {
        image = await pdfDoc.embedJpg(imgBytes);
      } else {
        throw new Error("Unsupported image format. Use PNG or JPG.");
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      const pdfBytes = await pdfDoc.save();
      await fs.writeFile(resultPath, pdfBytes);
    } else {
      await fs.copyFile(file.path, resultPath);
    }
    
    await storage.updateJob(jobId, {
      status: "completed",
      resultFilename
    });
  } catch (err: any) {
    await storage.updateJob(jobId, {
      status: "failed",
      errorMessage: err.message
    });
  } finally {
    try {
      await fs.unlink(file.path);
    } catch {}
  }
}
