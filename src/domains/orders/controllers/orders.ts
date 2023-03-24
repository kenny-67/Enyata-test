import { Response } from "express";
import { InvalidInputData } from "shared/errors";
import { AuthRequest } from "shared/types";
import { handleUnknownError } from "shared/utils";
import { createOrderUsecase, getOrdersUsecase } from "../usecases/index";

export class OrdersController {
  static async createOrder(req: AuthRequest, res: Response) {
    const { title, description, price } = req.body;

    try {
      await createOrderUsecase.execute(
        title,
        description,
        price,
        req.decoded?.email as string
      );

      return res.status(201).json({ message: "Order Created" });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid data",
        });
      }
      return handleUnknownError(res, {
        error,
      });
    }
  }
  static async getOrders(req: AuthRequest, res: Response) {
    const { page = 1, sortBy = "Descending", maxPrice, minPrice } = req.query;

    try {
      const response = await getOrdersUsecase.execute(
        page,
        sortBy,
        req.decoded?.email as string,
        maxPrice,
        minPrice
      );

      return res
        .status(200)
        .json({ message: "Successfully retrieved orders", data: response });
    } catch (error) {
      if (error instanceof InvalidInputData) {
        return res.status(400).json({
          message: "Invalid data",
        });
      }
      return handleUnknownError(res, {
        error,
      });
    }
  }
}
