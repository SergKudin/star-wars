import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Planet } from './entities/planet.entity';

@ApiTags('Planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @ApiOperation({ summary: 'Create a Planet' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: CreatePlanetDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @ApiOperation({ summary: 'Returns all available planets' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get()
  findAll() {
    return this.planetsService.findAll();
  }

  @ApiOperation({ summary: 'Returns a planet with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Planet })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates a planet with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdatePlanetDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @ApiOperation({ summary: 'Deletes a planet with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Planet identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }

  @ApiOperation({ summary: "Deletes all Planets data" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Delete('removeAll')
  removeAll() {
    return this.planetsService.removeAll()
  }

}
