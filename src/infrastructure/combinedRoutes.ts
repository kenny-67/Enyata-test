import { Application, Router } from "express";
import cors from "cors";
import { authRoutes } from "domains/auth/index";
import { orderRoutes } from "domains/orders/index";

export default function combinedRoutes(app: Application): void {
  const routesWithoutCorsSetting = Router();

  routesWithoutCorsSetting.use(cors());

  routesWithoutCorsSetting.use("/auth", authRoutes);
  routesWithoutCorsSetting.use("/order", orderRoutes);

  app.use("/api", routesWithoutCorsSetting);
}
