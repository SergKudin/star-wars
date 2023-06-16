import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/upate-people.dto';
import { PeopleService } from './people.service';
import { People } from './entities/people.entity';

@ApiTags('people')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"]) 
// // <----- Авторизация через Swagger 
@Controller('people')
export class PeopleController {

  constructor(private readonly peopleService: PeopleService) { }

  @Get()
  // @UseGuards(AuthGuard("api-key"))
  // // AuthGuard: Это класс-хранитель (guard) в NestJS, который предоставляет механизм аутентификации и авторизации для защиты эндпоинтов.
  // // "api-key": Это имя стратегии аутентификации, которое передается в AuthGuard, указывающее, какой тип аутентификации должен быть применен.
  @ApiOperation({ summary: "Returns all available records of People" })
  // summary: Краткое описание операции (метода).
  // description: Подробное описание операции (метода).
  // @ApiQuery({ name: "userId", required: true, description: "User identifier" })
  // // name: Имя параметра запроса. В данном случае, "userId".
  // // required: Указывает, является ли параметр обязательным (true/false).
  // // description: Описание параметра запроса. В данном случае, "User identifier".
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: People, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  // status: HTTP-статус код ответа.
  // description: Описание ответа.
  // type: Тип данных, используемый в ответе.
  // isArray: Указывает, является ли ответ массивом (true/false).
  getAll(): People[] {
    return this.peopleService.getAll()
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  // name: Имя параметра запроса. В данном случае, "id".
  // required: Указывает, является ли параметр обязательным (true/false).
  // description: Описание параметра запроса. В данном случае, "People identifier".
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: People })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): People {
    return this.peopleService.getById(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  // name: Имя параметра запроса. В данном случае, "id".
  // required: Указывает, является ли параметр обязательным (true/false).
  // description: Описание параметра запроса. В данном случае, "People identifier".
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: People })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Get('page/:page')
  getAllWithPagination(@Param('page', ParseIntPipe) page: number): People[] {
    return this.peopleService.getAllWithPagination(page, +process.env.PAGE_LIMIT)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Create a People" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success", type: People })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Post()
  create(@Body() createPeopleDto: CreatePeopleDto): People {
    return this.peopleService.create(createPeopleDto)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Deletes a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.remove(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @ApiOperation({ summary: "Updates a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: People })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Put(':id')
  update(@Body() updatePeopleDto: UpdatePeopleDto, @Param('id', ParseIntPipe) id: number): People {
    return this.peopleService.update(id, updatePeopleDto)
  }
}
