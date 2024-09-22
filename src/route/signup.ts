import type * as ff from "@google-cloud/functions-framework";
import { plainToClass } from "class-transformer";
import { isValidationErrors, valid } from "../functions/common";
import { add as addUser } from "../functions/repositories/user.repository";
import { UserDto } from "../models/dto/user.model.dto";

/**
 * サインアップ
 *
 * @param req リクエスト
 * @param res レスポンス
 * @returns 無し
 */
export const signup = async (
  req: ff.Request,
  res: ff.Response,
): Promise<void> => {
  const user = plainToClass(UserDto, req.body);
  try {
    await valid(user);
    const maskedUser = await addUser(user);
    res.json(maskedUser);
  } catch (errors) {
    if (isValidationErrors(errors)) {
      console.log(
        "Caught promise rejection (validation failed). Errors: ",
        errors,
      );
      res.sendStatus(400);
    } else {
      console.log("Caught promise rejection. Non-validation errors: ", errors);
      res.sendStatus(500);
    }
  }
};
