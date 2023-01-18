import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { config } from "./env";
import { appRouter } from "./routes";
import { createContext } from "./trpc";

config();
const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.get("/", (_, res) => res.send("Server is running."));
app.listen(port, () => console.log("Listening on port " + port));
