import { Router, type IRouter } from "express";
import healthRouter from "./health";
import categoriesRouter from "./categories";
import menuRouter from "./menu";
import ratingsRouter from "./ratings";
import ordersRouter from "./orders";
const router: IRouter = Router();

router.use(healthRouter);
router.use(categoriesRouter);
router.use(menuRouter);
router.use(ratingsRouter);
router.use(ordersRouter);

export default router;
