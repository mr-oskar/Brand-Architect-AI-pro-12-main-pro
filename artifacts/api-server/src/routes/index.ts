import { Router, type IRouter } from "express";
import healthRouter from "./health";
import brandsRouter from "./brands";
import campaignsRouter from "./campaigns";
import postsRouter from "./posts";
import dashboardRouter from "./dashboard";
import socialRouter from "./social";
import jobsRouter from "./jobs";
import imagesRouter from "./images";

const router: IRouter = Router();

router.use(healthRouter);
router.use(brandsRouter);
router.use(campaignsRouter);
router.use(postsRouter);
router.use(dashboardRouter);
router.use(socialRouter);
router.use(jobsRouter);
router.use(imagesRouter);

export default router;
