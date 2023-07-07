import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  // @ApiProperty({ description: 'User name', nullable: true })
  // @IsString()
  // name: string;

  @ApiProperty({ description: 'User email', nullable: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', nullable: true })
  @MinLength(6, { message: 'Password cannot be shorter than 6 characters' })
  password: string;
}
