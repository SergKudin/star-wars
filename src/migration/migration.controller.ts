import { Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePeopleDto } from 'src/people/dto/create-people.dto';
import { CreatePlanetDto } from 'src/planets/dto/create-planet.dto';
import { CreateFilmDto } from 'src/films/dto/create-film.dto';
import { CreateSpeciesDto } from 'src/species/dto/create-species.dto';
import { CreateVehicleDto } from 'src/vehicles/dto/create-vehicle.dto';
import { CreateStarshipDto } from 'src/starships/dto/create-starship.dto';
import { SwapiSummObj } from 'src/types/swapiSummObj.type';

@ApiTags('migration')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"]) 
// // <----- Авторизация через Swagger 
@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) { }

  @Get()
  @ApiOperation({ summary: "Returns all available records SWAPI of People" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal Server Error" })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllData(): Promise<{ [key: string]: SwapiSummObj[] }> {
    return this.migrationService.getMigrationData()
  }

  @Get('people')
  @ApiOperation({ summary: "Returns all available records SWAPI of People" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreatePeopleDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal Server Error" })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDataPeople(): Promise<CreatePeopleDto[]> {
    return this.migrationService.getDataFromSwapi<CreatePeopleDto>('people')
  }

  @Get('planets')
  @ApiOperation({ summary: "Returns all available records SWAPI of Planets" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreatePlanetDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal Server Error" })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDataPlanets(): Promise<CreatePlanetDto[]> {
    return this.migrationService.getDataFromSwapi<CreatePlanetDto>('planets')
  }

  @Get('films')
  @ApiOperation({ summary: "Returns all available records SWAPI of Films" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateFilmDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal Server Error" })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDataFilms(): Promise<CreateFilmDto[]> {
    return this.migrationService.getDataFromSwapi<CreateFilmDto>('films')
  }

  @Get('species')
  @ApiOperation({ summary: "Returns all available records SWAPI of Species" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateSpeciesDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal Server Error" })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDataSpecies(): Promise<CreateSpeciesDto[]> {
    return this.migrationService.getDataFromSwapi<CreateSpeciesDto>('species')
  }

  @Get('vehicles')
  @ApiOperation({ summary: "Returns all available records SWAPI of Vehicles" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateVehicleDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal Server Error" })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDataVehicles(): Promise<CreateVehicleDto[]> {
    return this.migrationService.getDataFromSwapi<CreateVehicleDto>('vehicles')
  }

  @Get('starships')
  @ApiOperation({ summary: "Returns all available records SWAPI of Starships" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: CreateStarshipDto, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal Server Error" })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDataStarships(): Promise<CreateStarshipDto[]> {
    return this.migrationService.getDataFromSwapi<CreateStarshipDto>('starships')
  }

  @Post('createAll')
  @ApiOperation({ summary: "Create all objects to DB" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async create() {
    return await this.migrationService.createAllObjectsToDB()
  }

}
