import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Redirect, Req, Res, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/upate-people.dto';
import { PeopleService } from './people.service';
import { SwapiResponse } from 'src/types/swapiResponse.type';
import { People } from './entities/people.entity';

@ApiTags('People')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"]) 
// // <----- Авторизация через Swagger 
@Controller('people')
export class PeopleController {

  constructor(private readonly peopleService: PeopleService) { }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Create a People" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success", type: CreatePeopleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Post()
  // @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createPeopleDto: CreatePeopleDto): Promise<People> {
    return await this.peopleService.createPeople(createPeopleDto)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreatePeopleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.getById(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  // name: Имя параметра запроса. В данном случае номер страницы.
  // required: Указывает, является ли параметр обязательным (true/false).
  // description: Описание параметра запроса. В данном случае, "People identifier".
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: SwapiResponse<People> })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Get('page/:page')
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<People>> {
    return this.peopleService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  // @UseGuards(AuthGuard("api-key" ))
  @ApiOperation({ summary: "Updates a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdatePeopleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Patch(':id')
  // @UsePipes(new ValidationPipe({ transform: true }))
  update(@Body() updatePeopleDto: UpdatePeopleDto, @Param('id', ParseIntPipe) id: string): Promise<People> {
    return this.peopleService.updatePeople(id, updatePeopleDto)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Soft-deletes a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.remove(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Restores records of people with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Post('restore/:id')
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.restore(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Deletes all People data" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Delete('removeAll')
  removeAll() {
    return this.peopleService.removeAll()
  }
}
