import "reflect-metadata";
import * as ff from "@google-cloud/functions-framework";
import express from "express";
import { signin } from "./route/signin";
import { signup } from "./route/signup";
import passport from "./services/passport.service";

// @note express
const app = express();
const router = express.Router();

// @note middlewares
app.use(router);
app.use(passport.initialize());

// @note routes
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin,
);

ff.http("jwtPublication", app);
