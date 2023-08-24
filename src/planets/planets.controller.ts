import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseInterceptors, ParseIntPipe, Req } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Planet } from './entities/planet.entity';
import { DataInterceptor } from 'src/interceptors/data.interceptor';
import { SwapiResponse } from 'src/types/swapi-response.type';
import { ResultInterceptor } from 'src/interceptors/result.interceptor';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorators';

@ApiTags('Planets')
@ApiBearerAuth('jwt')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Post()
  @Roles('admin')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Create a Planet. Links with other objects are made using the url field" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async create(@Body() createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return await this.planetsService.createPlanet(createPlanetDto)
  }

  @Get('list-removed')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removedElements() {
    return this.planetsService.getListRemovedElements();
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "Planet identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.planetsService.getById(id)
  }

  @Get('page/:page')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<Planet>> {
    return this.planetsService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  @Patch(':id')
  @Roles('admin')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Updates a Planet with specified id" })
  @ApiParam({ name: "id", required: true, description: "Planet identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Body() updatePlanetDto: UpdatePlanetDto, @Param('id', ParseIntPipe) id: string): Promise<Planet> {
    return this.planetsService.updatePlanet(id, updatePlanetDto)
  }

  @Delete('remove/:id')
  @Roles('admin')
  @UseInterceptors(ResultInterceptor)
  @ApiOperation({ summary: "Soft-deletes a Planet with specified id" })
  @ApiParam({ name: "id", required: true, description: "Planet identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.planetsService.remove(id)
  }

  @Post('restore/:id')
  @Roles('admin')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Restores records of Planet with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "Planet identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.planetsService.restore(id)
  }

}
