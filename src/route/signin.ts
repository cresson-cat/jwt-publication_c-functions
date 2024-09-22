import type * as ff from "@google-cloud/functions-framework";
import jwt from "jsonwebtoken";

/**
 * サインイン
 *
 * @param req リクエスト
 * @param res レスポンス
 */
export const signin = async (req: ff.Request, res: ff.Response) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ iss: req.body.name }, secret, { expiresIn: "1h" });
  res.json({ token });
};
