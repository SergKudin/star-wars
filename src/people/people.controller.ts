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

  @Post()
  @ApiOperation({ summary: "Create a People" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success", type: CreatePeopleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async create(@Body() createPeopleDto: CreatePeopleDto): Promise<People> {
    return await this.peopleService.createPeople(createPeopleDto)
  }

  @Get('list-removed')
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removedElements() {
    return this.peopleService.getListRemovedElements();
  }

  @Get(':id')
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreatePeopleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.getById(id)
  }

  @Get('page/:page')
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: SwapiResponse<People> })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<People>> {
    return this.peopleService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  // @UseGuards(AuthGuard("api-key"))

  @Patch(':id')
  @ApiOperation({ summary: "Updates a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdatePeopleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Body() updatePeopleDto: UpdatePeopleDto, @Param('id', ParseIntPipe) id: string): Promise<People> {
    return this.peopleService.updatePeople(id, updatePeopleDto)
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: "Soft-deletes a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.remove(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @Delete('removeAll')
  @ApiOperation({ summary: "Deletes all People data" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removeAll() {
    return this.peopleService.removeAll()
  }

  // @UseGuards(AuthGuard("api-key"))
  @Post('restore/:id')
  @ApiOperation({ summary: "Restores records of people with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.restore(id)
  }
}
