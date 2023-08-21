import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @MinLength(6, { message: 'Password cannot be shorter than 6 characters' })
  password: string;
}
