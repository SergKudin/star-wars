import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Films } from './entities/film.entity';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) { }

  @ApiOperation({ summary: 'Create a Film' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: CreateFilmDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @ApiOperation({ summary: 'Returns all available films' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Films, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get()
  findAll() {
    return this.filmsService.findAll();
  }

  @ApiOperation({ summary: 'Returns a film with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Films })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates a film with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdateFilmDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @ApiOperation({ summary: 'Deletes a film with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Film identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filmsService.remove(id);
  }

  @ApiOperation({ summary: 'Deletes all Films data' })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Delete('removeAll')
  removeAll() {
    return this.filmsService.removeAll();
  }

}

