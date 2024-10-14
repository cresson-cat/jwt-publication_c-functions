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

const signinFnSet = [
  passport.authenticate("local", { session: false }),
  signin
] as const;

// @note routes
router.post("/signup", signup);
router.post(
  "/signin",
  ...signinFnSet,
);
router.post(
  "/",
  ...signinFnSet,
);

ff.http("jwtPublication", app);
