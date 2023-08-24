import { Controller, Get, Post, Body, Param, HttpStatus, UsePipes, ValidationPipe, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorators';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @SkipAuth()
  @Post()
  @ApiOperation({ summary: "Create a User" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth('jwt')
  @Get(':email')
  @ApiOperation({ summary: "Returns a note with specified email. A record is created with the type 'user' only" })
  @ApiParam({ name: "email", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async findOne(@Param('email') email: string): Promise<User> {
    const { password, ...rest } = await this.userService.findOne(email);
    return { ...rest }
  }

  @ApiBearerAuth('jwt')
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: "Update the note with the specified id. Allows you to change the user's role. The password remains unchanged!" })
  @ApiParam({ name: "id", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
    return await this.userService.update(updateUserDto, id);
  }

  @ApiBearerAuth('jwt')
  @Roles('admin')
  @Patch('passUpd/:id')
  @ApiOperation({ summary: "User password update" })
  @ApiParam({ name: "id", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async updatePass(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
    return await this.userService.updatePass(updateUserDto, id);
  }

}
