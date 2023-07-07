import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Species } from './entities/species.entity';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @ApiOperation({ summary: 'Create a Species' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: CreateSpeciesDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @ApiOperation({ summary: 'Returns all available species' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Species, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @ApiOperation({ summary: 'Returns a species with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Species identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Species })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates a species with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Species identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdateSpeciesDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @ApiOperation({ summary: 'Deletes a species with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Species identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}
