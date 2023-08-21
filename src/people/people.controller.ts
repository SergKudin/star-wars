import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UseInterceptors, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/upate-people.dto';
import { PeopleService } from './people.service';
import { SwapiResponse } from 'src/types/swapi-response.type';
import { People } from './entities/people.entity';
import { DataInterceptor } from 'src/interceptors/data.interceptor';
import { ResultInterceptor } from 'src/interceptors/result.interceptor';
import { MyResponse } from 'src/types/my-response.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('People')
@ApiBearerAuth('jwt')
@Controller('people')
export class PeopleController {

  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Create a People. Links with other objects are made using the url field" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async create(@Body() createPeopleDto: CreatePeopleDto): Promise<People> {
    return await this.peopleService.createPeople(createPeopleDto)
  }

  @Get('list-removed')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removedElements() {
    return this.peopleService.getListRemovedElements();
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.getById(id)
  }

  @Get('page/:page')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<People>> {
    return this.peopleService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  @Patch(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Updates a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Body() updatePeopleDto: UpdatePeopleDto, @Param('id', ParseIntPipe) id: string): Promise<People> {
    return this.peopleService.updatePeople(id, updatePeopleDto)
  }

  @Delete('remove/:id')
  @UseInterceptors(ResultInterceptor)
  @ApiOperation({ summary: "Soft-deletes a People with specified id" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.remove(id)
  }

  @Post('restore/:id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Restores records of people with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "People identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.restore(id)
  }
}
