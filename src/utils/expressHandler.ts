import { Response } from "express";
import { HttpStatusCode } from "~/utils/httpCodes";
import { HttpError } from "~/utils/httpError";

export const handleExpress = <F>(res: Response, fn: () => F) => {
  try {
    const data = fn();
    res.status(HttpStatusCode.OK).send(data);
  } catch (e) {
    if (e instanceof HttpError) {
      res.status(e.statusCode).send({ messege: e.message });
      return;
    }
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Internal server error");
  }
};
