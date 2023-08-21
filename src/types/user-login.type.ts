import { ApiProperty } from "@nestjs/swagger"

export class UserLogin {
  @ApiProperty({ description: 'user id', nullable: false })
  id?: string

  @ApiProperty({ description: 'user email', nullable: false })
  email: string

  @ApiProperty({ description: 'user token', nullable: true })
  token?: string

  @ApiProperty({ description: 'user password', nullable: false })
  password?: string

}