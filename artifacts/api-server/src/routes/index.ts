import { Router, type IRouter } from "express";
import healthRouter from "./health";
import brandsRouter from "./brands";
import campaignsRouter from "./campaigns";
import postsRouter from "./posts";
import dashboardRouter from "./dashboard";
import socialRouter from "./social";

const router: IRouter = Router();

router.use(healthRouter);
router.use(brandsRouter);
router.use(campaignsRouter);
router.use(postsRouter);
router.use(dashboardRouter);
router.use(socialRouter);

export default router;
