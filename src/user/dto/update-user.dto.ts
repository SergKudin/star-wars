import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Roles } from 'src/types/roles.type';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty({ description: 'User role' })
  role: Roles;

}
