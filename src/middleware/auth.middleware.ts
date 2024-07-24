import { Handler, Request, Response, NextFunction } from "express";
import { userService } from "~/dependencies";
import { HttpStatusCode } from "~/utils/httpCodes";
import { HttpError } from "~/utils/httpError";
// import { userService } from "./dependency";

export const loginMiddleware: Handler = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: "not authorized" });
  }
  const [username, password] = authorizationHeader.split(":");
  try {
    console.log("logged in as", username, password);
    const loggedUser = userService.login({ username, password });
    res.locals.currentuser = loggedUser;
    next();
  } catch (e) {
    if (e instanceof HttpError) {
      res.status(e.statusCode).send(e.message);
      return;
    }
  }
};
