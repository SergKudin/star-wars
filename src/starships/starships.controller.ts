import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseInterceptors, Req } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Starships } from './entities/starship.entity';
import { DataInterceptor } from 'src/interceptors/data.interceptor';
import { SwapiResponse } from 'src/types/swapiResponse.type';
import { ResultInterceptor } from 'src/interceptors/result.interceptor';
import { DeleteResult } from 'typeorm';

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @Post()
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Create a Starship. Links with other objects are made using the url field" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async create(@Body() createStarshipDto: CreateStarshipDto): Promise<Starships> {
    return await this.starshipsService.createStarship(createStarshipDto)
  }

  @Get('list-removed')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removedElements() {
    return this.starshipsService.getListRemovedElements();
  }

  @Get(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiParam({ name: "id", required: true, description: "Starship identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.getById(id)
  }

  @Get('page/:page')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page', ParseIntPipe) page: number): Promise<SwapiResponse<Starships>> {
    return this.starshipsService.getAllWithPagination(request.url, page, +process.env.PAGE_LIMIT)
  }

  @Patch(':id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Updates a Starship with specified id" })
  @ApiParam({ name: "id", required: true, description: "Starship identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  update(@Body() updateStarshipDto: UpdateStarshipDto, @Param('id', ParseIntPipe) id: string): Promise<Starships> {
    return this.starshipsService.updateStarship(id, updateStarshipDto)
  }

  @Delete('remove/:id')
  @UseInterceptors(ResultInterceptor)
  @ApiOperation({ summary: "Soft-deletes a Starship with specified id" })
  @ApiParam({ name: "id", required: true, description: "Starship identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.remove(id)
  }

  // @UseGuards(AuthGuard("api-key"))
  @Post('restore/:id')
  @UseInterceptors(DataInterceptor)
  @ApiOperation({ summary: "Restores records of Starship with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "Starship identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  restoreSoftDelete(@Param('id', ParseIntPipe) id: number) {
    return this.starshipsService.restore(id)
  }

}
