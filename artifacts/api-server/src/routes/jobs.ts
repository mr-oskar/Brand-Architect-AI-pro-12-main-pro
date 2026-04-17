import { Router, type IRouter } from "express";
import { getJob } from "../lib/jobStore";
import { asyncHandler } from "../lib/asyncHandler";

const router: IRouter = Router();

router.get("/jobs/:id", asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = getJob(jobId);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(job);
}));

export default router;
