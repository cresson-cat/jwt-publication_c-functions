import { Firestore } from "@google-cloud/firestore";
import * as bcrypt from "bcrypt";
import type { UserDto } from "../../models/dto/user.model.dto";

const db = new Firestore({
  projectId: "generic-jwt-publication",
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

/**
 * User を取得する
 *
 * @param username
 * @returns ユーザ名
 */
export const findByName = async (username: string): Promise<UserDto> => {
  const reference = db.collection("users").doc(username);
  const user = await reference.get();
  return user.data() as UserDto;
};

/**
 * User を登録する
 *
 * @param db Firestore
 * @param dto DTO
 * @returns 無し
 */
export const add = async (dto: UserDto) => {
  const reference = db.collection("users").doc(dto.name);
  const user = {
    name: dto.name,
    password: await bcrypt.hash(dto.password, 10),
  };
  await reference.set(user);
  return user;
};
