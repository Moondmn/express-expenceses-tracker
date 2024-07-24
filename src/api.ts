import express, { Application, Request, Response } from "express";
import { loginMiddleware } from "./middleware/auth.middleware";
import { router as userRouter } from "./routes/users.routes";
export const app: Application = express();

app.use(express.json());

// routes
app.use(userRouter);
app.use("/groups", loginMiddleware);

// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
