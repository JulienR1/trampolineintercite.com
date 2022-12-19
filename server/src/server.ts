import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./routes";
import { createContext } from "./trpc";

const port = process.env.PORT || 4000;

const app = express();
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.get("/", (_, res) => res.send("Server is running."));
app.listen(port, () => console.log("Listening on port " + port));
