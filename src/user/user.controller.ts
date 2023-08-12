import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"]) 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @UseGuards(AuthGuard("api-key"))
  @Post()
  @ApiOperation({ summary: "Create a User" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success", type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // // @UseGuards(AuthGuard("api-key"))
  // @ApiOperation({ summary: "Returns all available records of Users" })
  // // @ApiQuery({ name: "userId", required: true, description: "User identifier" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User, isArray: true })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @UseGuards(AuthGuard("api-key"))
  @Get(':id')
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "User identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // // @UseGuards(AuthGuard("api-key"))
  // @ApiOperation({ summary: "Updates a User with specified id" })
  // @ApiParam({ name: "id", required: true, description: "User identifier" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdateUserDto })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // // @UseGuards(AuthGuard("api-key"))
  // @ApiOperation({ summary: "Deletes a User with specified id" })
  // @ApiParam({ name: "id", required: true, description: "User identifier" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
