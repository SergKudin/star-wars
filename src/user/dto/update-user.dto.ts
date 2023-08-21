import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum } from 'class-validator';

enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty({ description: 'User role', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

}
