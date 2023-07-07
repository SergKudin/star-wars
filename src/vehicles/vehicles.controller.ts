import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vehicles } from './entities/vehicle.entity';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @ApiOperation({ summary: 'Create a Vehicle' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: CreateVehicleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @ApiOperation({ summary: 'Returns all available vehicles' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicles, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @ApiOperation({ summary: 'Returns a vehicle with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Vehicles })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates a vehicle with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdateVehicleDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @ApiOperation({ summary: 'Deletes a vehicle with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Vehicle identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
