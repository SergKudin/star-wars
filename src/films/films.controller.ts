import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseInterceptors, Req } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Films } from './entities/film.entity';
import { DataInterceptor } from 'src/interceptors/data.interceptor';
import { SwapiResponse } from 'src/types/swapi-response.type';
import { ResultInterceptor } from 'src/interceptors/result.interceptor';
import { DeleteResult } from 'typeorm';

@ApiTags('Films')
@ApiBearerAuth('jwt')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @Post()
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: 'Create a Film' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.createFilms(createFilmDto);
  }

  @Get('list-removed')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removedElements() {
    return this.filmsService.getListRemovedElements();
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "Film identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.getById(id)
  }

  @Get('page/:page')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<Films>> {
    return this.filmsService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  @Patch(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Updates a Film with specified id" })
  @ApiParam({ name: "id", required: true, description: "Film identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Body() updateFilmDto: UpdateFilmDto, @Param('id', ParseIntPipe) id: string): Promise<Films> {
    return this.filmsService.updateFilm(id, updateFilmDto)
  }

  @Delete('remove/:id')
  @UseInterceptors(ResultInterceptor)
  @ApiOperation({ summary: "Soft-deletes a Film with specified id" })
  @ApiParam({ name: "id", required: true, description: "Film identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.remove(id)
  }

  @Post('restore/:id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Restores records of Film with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "Film identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.restore(id)
  }

}

