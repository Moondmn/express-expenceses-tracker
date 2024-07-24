// import express, { type Request, type Response, type Application } from "express";
import { app } from "~/api";

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
