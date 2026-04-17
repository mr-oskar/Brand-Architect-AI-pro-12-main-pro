import { Router, type IRouter } from "express";
import { streamStoredImage } from "../lib/imageStorage";

const router: IRouter = Router();

/**
 * GET /storage/images/objects/uploads/:id
 *
 * Serve AI-generated images stored in Object Storage.
 * The imageUrl in the DB looks like: /api/storage/images/objects/uploads/<uuid>
 */
router.get("/storage/images/objects/uploads/:id", async (req, res) => {
  const { id } = req.params;
  const objectPath = `/objects/uploads/${id}`;

  try {
    const result = await streamStoredImage(objectPath);
    if (!result) {
      res.status(404).json({ error: "Image not found" });
      return;
    }

    res.setHeader("Content-Type", result.contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    result.stream.pipe(res);
  } catch {
    res.status(500).json({ error: "Failed to retrieve image" });
  }
});

export default router;
