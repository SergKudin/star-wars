import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Req, UseInterceptors } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vehicles } from './entities/vehicle.entity';
import { DataInterceptor } from 'src/interceptors/data.interceptor';
import { ResultInterceptor } from 'src/interceptors/result.interceptor';
import { SwapiResponse } from 'src/types/swapi-response.type';

@ApiTags('Vehicles')
@ApiBearerAuth('jwt')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Create a Vehicle. Links with other objects are made using the url field" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicles> {
    return await this.vehiclesService.createVehicle(createVehicleDto)
  }

  @Get('list-removed')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removedElements() {
    return this.vehiclesService.getListRemovedElements();
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "Vehicle identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.getById(id)
  }

  @Get('page/:page')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<Vehicles>> {
    return this.vehiclesService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  @Patch(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Updates a Vehicle with specified id" })
  @ApiParam({ name: "id", required: true, description: "Vehicle identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Body() updateVehicleDto: UpdateVehicleDto, @Param('id', ParseIntPipe) id: string): Promise<Vehicles> {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto)
  }

  @Delete('remove/:id')
  @UseInterceptors(ResultInterceptor)
  @ApiOperation({ summary: "Soft-deletes a Vehicle with specified id" })
  @ApiParam({ name: "id", required: true, description: "Vehicle identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.remove(id)
  }

  @Post('restore/:id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Restores records of Vehicle with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "Vehicle identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.restore(id)
  }

}
