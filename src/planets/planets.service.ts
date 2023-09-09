import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { SwapiResponse } from 'src/types/swapi-response.type';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
    @InjectRepository(Starships)
    private readonly starshipsRepository: Repository<Starships>,
  ) { }

  query = {
    select: {
      planet_id: true,
      name: true,
      diameter: true,
      rotation_period: true,
      orbital_period: true,
      gravity: true,
      population: true,
      climate: true,
      terrain: true,
      surface_water: true,
      url: true,
      createdAt: true,
      updatedAt: true,
      films: { film_id: true, title: true },
      residents: { _id: true, name: true },
      photos: { photo_id: true, originalname: true },
    },
    relations: {
      films: true,
      residents: true,
      photos: true,
    },
  }


  async createPlanet(createPlanetDto: CreatePlanetDto): Promise<Planet> {
    const existPlanet: Planet = await this.planetRepository.findOne({ where: { url: createPlanetDto.url } });
    if (existPlanet)
      throw new NotFoundException(`This Planet: ${createPlanetDto.name} with url: ${createPlanetDto.url} already exists`);

    return this.savePlanetWithLinks(createPlanetDto);
  }

  async updatePlanet(id: string, updatePlanetDto: UpdatePlanetDto): Promise<Planet> {
    const existPlanetUrl: Planet = await this.planetRepository.findOne({ where: { url: updatePlanetDto.url } });
    if (!existPlanetUrl)
      throw new NotFoundException(`Bad request! Check Your data: url ${updatePlanetDto.url} not found`);
    if (existPlanetUrl.planet_id !== id)
      throw new BadRequestException(`Bad request! Check Your data: found url ${existPlanetUrl.url} with id: ${existPlanetUrl.planet_id}`);

    updatePlanetDto.planet_id = id;
    return this.savePlanetWithLinks(updatePlanetDto);
  }

  async savePlanetWithLinks(planetData: CreatePlanetDto | UpdatePlanetDto): Promise<Planet> {
    const { residents, films, ...rest } = planetData;

    // Save the Planet object with no links    
    const savedPlanet = await this.planetRepository.save(rest);

    // Get instances of related objects from repositories & Establish links between objects    
    if (films) savedPlanet.films = await this.filmsRepository.find({ where: { url: In(films) } });
    if (residents) savedPlanet.residents = await this.peopleRepository.find({ where: { url: In(residents) } });

    // Save the updated Planet object with the relationships set    
    return this.planetRepository.save(savedPlanet);
  }

  async createPlanetObj(createPlanetDto: CreatePlanetDto[]): Promise<Planet[]> {

    const savedPlanets: Planet[] = [];

    // Save Planet Objects Without Relationships    
    for (let dto of createPlanetDto) {
      savedPlanets.push(await this.createPlanet(dto))
    }
    return savedPlanets;
  }

  async updatePlanetRelations(createPlanetDto: CreatePlanetDto[]): Promise<Planet[]> {
    const savedPlanets: Planet[] = [];

    for (const dto of createPlanetDto) {

      let existingPlanet: Planet = await this.planetRepository.findOne({ where: { url: dto.url } });

      if (!existingPlanet) {
        const { residents, films, ...rest } = dto
        existingPlanet = await this.planetRepository.save(rest);
        console.error(`Planet ${dto.name} not found. Create new data Planet`);
      }
      savedPlanets.push(await this.savePlanetWithLinks(dto));
    }
    return savedPlanets;
  }

  async getAllWithPagination(route: string, page: number, pageLimit: number): Promise<SwapiResponse<Planet>> {
    // limit - elements by page
    const { countStr }: { countStr: string } = await this.planetRepository
      .createQueryBuilder('planet')
      .select('COUNT(planet_id) AS countStr')
      .getRawOne()
    const count: number = +countStr
    const indexStart: number = (page - 1) * pageLimit
    route = process.env.IP + route.split('/').slice(0, -1).join('/') + '/'
    const next: string = (page * pageLimit < count) ? route + (page + 1) : 'null'
    const previous: string = (page < 2) ? 'null' : route + (page - 1)
    const results: Planet[] = await this.planetRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      skip: indexStart,
      take: pageLimit,
    })
    return { count, next, previous, results }
  }

  async getById(id: number): Promise<Planet> {
    const existPlanet: Planet[] = await this.planetRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      where: { planet_id: id + '' }
    })
    if (!existPlanet)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return existPlanet[0]
  }

  async remove(id: number): Promise<UpdateResult> {
    const existPlanet: Planet = await this.planetRepository.findOne({ where: { planet_id: id + '' } })
    if (!existPlanet)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)

    return await this.planetRepository
      .createQueryBuilder('planet')
      .softDelete()
      .where("planet_id = :id", { id: id })
      .execute()
  }

  async getListRemovedElements(): Promise<Planet[]> {
    return await this.planetRepository.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
  }

  async restore(id: number): Promise<Planet> {
    const result: UpdateResult = await this.planetRepository
      .createQueryBuilder('planet')
      .restore()
      .where("planet_id = :id", { id: id })
      .execute()
    if (!result.affected)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return await this.planetRepository.findOne({ where: { planet_id: id + '' } })
  }

  async removeAll(): Promise<DeleteResult> {
    console.log('removeAllPlanet !!!')
    return await this.planetRepository
      .createQueryBuilder('planet')
      .delete()
      .from(Planet)
      .execute();
  }

}
