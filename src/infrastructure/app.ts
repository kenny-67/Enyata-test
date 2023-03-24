import express, { Request, Response } from "express";
import addRoutesToApp from "./combinedRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
addRoutesToApp(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

export default app;
