import * as bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import passport from "passport";
import {
  Strategy as LocalStrategy,
  type VerifyFunctionWithRequest,
} from "passport-local";
import { isValidationErrors, valid } from "../functions/common";
import { findByName } from "../functions/repositories/user.repository";
import { UserDto } from "../models/dto/user.model.dto";

/**
 * passport-local の検証関数
 *
 * @param req リクエスト
 * @param username ユーザ名
 * @param password パスワード
 * @param done 次のミドルウェア関数
 */
const verify: VerifyFunctionWithRequest = async (
  req,
  username,
  password,
  done,
) => {
  const result = {
    success: () => done(null, user),
    failure: () => done(null, false),
  };
  const unverified = plainToClass(UserDto, req.body);

  try {
    await valid(unverified);
  } catch (errors) {
    if (isValidationErrors(errors)) {
      console.log(
        "Caught promise rejection (validation failed). Errors: ",
        errors,
      );
    } else {
      console.log("Caught promise rejection. Non-validation errors: ", errors);
    }
    return result.failure();
  }

  const user = await findByName(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return result.failure();
  }
  return result.success();
};

// @note passport-local 定義
passport.use(
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "name", session: false },
    verify,
  ),
);

export default passport;
