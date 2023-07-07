import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Starships } from './entities/starship.entity';

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @ApiOperation({ summary: 'Create a Starship' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: CreateStarshipDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @ApiOperation({ summary: 'Returns all available starships' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Starships, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get()
  findAll() {
    return this.starshipsService.findAll();
  }

  @ApiOperation({ summary: 'Returns a starship with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Starships })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starshipsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates a starship with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: UpdateStarshipDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @ApiOperation({ summary: 'Deletes a starship with the specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Starship identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }
}
