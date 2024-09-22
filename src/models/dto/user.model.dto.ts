import {
  IsNotEmpty,
  IsStrongPassword,
  Matches,
  MaxLength,
} from "class-validator";

/**
 * ユーザ情報
 */
export class UserDto {
  @Matches(/^[ -~]+$/)
  @IsNotEmpty()
  @MaxLength(20)
  name!: string;

  @IsStrongPassword({
    minLength: 4,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}
