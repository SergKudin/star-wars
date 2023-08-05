import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, Req, UseInterceptors } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Species } from './entities/species.entity';
import { DataInterceptor } from 'src/interceptors/data.interceptor';
import { ResultInterceptor } from 'src/interceptors/result.interceptor';
import { SwapiResponse } from 'src/types/swapiResponse.type';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @Post()
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Create a Species. Links with other objects are made using the url field" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async create(@Body() createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    return await this.speciesService.createSpecies(createSpeciesDto)
  }

  @Get('list-removed')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removedElements(): Promise<Species[]> {
    return this.speciesService.getListRemovedElements();
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "Species identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getById(@Param('id', ParseIntPipe) id: number): Promise<Species> {
    return this.speciesService.getById(id)
  }

  @Get('page/:page')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<Species>> {
    return this.speciesService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  @Patch(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Updates a Species with specified id" })
  @ApiParam({ name: "id", required: true, description: "Species identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Body() updateSpeciesDto: UpdateSpeciesDto, @Param('id', ParseIntPipe) id: string): Promise<Species> {
    return this.speciesService.updateSpecies(id, updateSpeciesDto)
  }

  @Delete('remove/:id')
  @UseInterceptors(ResultInterceptor)
  @ApiOperation({ summary: "Soft-deletes a Species with specified id" })
  @ApiParam({ name: "id", required: true, description: "Species identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id', ParseIntPipe) id: number): Promise<UpdateResult> {
    return this.speciesService.remove(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @Post('restore/:id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Restores records of Species with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "Species identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number): Promise<Species> {
    return this.speciesService.restore(id)
  }

}
