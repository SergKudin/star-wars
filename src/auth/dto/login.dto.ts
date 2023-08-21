import { ApiProperty } from "@nestjs/swagger";

export class LoginDto  {
    @ApiProperty({ description: 'user email', nullable: false })
    email: string
  
    @ApiProperty({ description: 'user password', nullable: false })
    password?: string
}
