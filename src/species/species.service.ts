import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { SwapiResponse } from 'src/types/swapi-response.type';

@Injectable()
export class SpeciesService {
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
      species_id: true,
      name: true,
      classification: true,
      designation: true,
      average_height: true,
      average_lifespan: true,
      eye_colors: true,
      hair_colors: true,
      skin_colors: true,
      language: true,
      url: true,
      createdAt: true,
      updatedAt: true,
      films: { film_id: true, title: true },
      people: { _id: true, name: true },
      homeworld: { planet_id: true, name: true },
      photos: { photo_id: true, originalname: true },
    },
    relations: {
      films: true,
      people: true,
      photos: true,
      homeworld: true,
    },
  }


  async createSpecies(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const existSpecies: Species = await this.speciesRepository.findOne({ where: { url: createSpeciesDto.url } });
    if (existSpecies)
      throw new NotFoundException(`This Species: ${createSpeciesDto.name} with url: ${createSpeciesDto.url} already exists`);

    return this.saveSpeciesWithLinks(createSpeciesDto);
  }

  async updateSpecies(id: string, updateSpeciesDto: UpdateSpeciesDto): Promise<Species> {
    const existSpeciesUrl: Species = await this.speciesRepository.findOne({ where: { url: updateSpeciesDto.url } });
    if (!existSpeciesUrl)
      throw new NotFoundException(`Bad request! Check Your data: url ${updateSpeciesDto.url} not found`);
    if (existSpeciesUrl.species_id !== id)
      throw new BadRequestException(`Bad request! Check Your data: found url ${existSpeciesUrl.url} with id: ${existSpeciesUrl.species_id}`);

    updateSpeciesDto.species_id = id;
    return this.saveSpeciesWithLinks(updateSpeciesDto);
  }

  async saveSpeciesWithLinks(speciesData: CreateSpeciesDto | UpdateSpeciesDto): Promise<Species> {
    const { people, films, homeworld, ...rest } = speciesData;

    // Save the Species object with no links    
    const savedSpecies = await this.speciesRepository.save(rest);

    // Get instances of related objects from repositories & Establish links between objects    
    if (homeworld) savedSpecies.homeworld = await this.planetRepository.findOne({ where: { url: homeworld } });
    if (films) savedSpecies.films = await this.filmsRepository.find({ where: { url: In(films) } });
    if (people) savedSpecies.people = await this.peopleRepository.find({ where: { url: In(people) } });

    // Save the updated Species object with the relationships set    
    return this.speciesRepository.save(savedSpecies);
  }

  async createSpeciesObj(createSpeciesDto: CreateSpeciesDto[]): Promise<Species[]> {

    const savedSpecies: Species[] = [];

    // Save Species Objects Without Relationships    
    for (let dto of createSpeciesDto) {
      savedSpecies.push(await this.createSpecies(dto))
    }
    return savedSpecies;
  }

  async updateSpeciesRelations(createSpeciesDto: CreateSpeciesDto[]): Promise<Species[]> {
    const savedSpecies: Species[] = [];

    for (const dto of createSpeciesDto) {

      let existingSpecies: Species = await this.speciesRepository.findOne({ where: { url: dto.url } });

      if (!existingSpecies) {
        const { people, films, homeworld, ...rest } = dto
        existingSpecies = await this.speciesRepository.save(rest);
        console.error(`Species ${dto.name} not found. Create new data Species`);
      }
      savedSpecies.push(await this.saveSpeciesWithLinks(dto));
    }
    return savedSpecies;
  }

  async getAllWithPagination(route: string, page: number, pageLimit: number): Promise<SwapiResponse<Species>> {
    // limit - elements by page
    const { countStr }: { countStr: string } = await this.speciesRepository
      .createQueryBuilder('species')
      .select('COUNT(species_id) AS countStr')
      .getRawOne()
    const count: number = +countStr
    const indexStart: number = (page - 1) * pageLimit
    route = process.env.IP + route.split('/').slice(0, -1).join('/') + '/'
    const next: string = (page * pageLimit < count) ? route + (page + 1) : 'null'
    const previous: string = (page < 2) ? 'null' : route + (page - 1)
    const results: Species[] = await this.speciesRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      skip: indexStart,
      take: pageLimit,
    })
    return { count, next, previous, results }
  }

  async getById(id: number): Promise<Species> {
    const existSpecies: Species[] = await this.speciesRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      where: { species_id: id + '' }
    })
    if (!existSpecies)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return existSpecies[0]
  }

  async remove(id: number): Promise<UpdateResult> {
    const existSpecies: Species = await this.speciesRepository.findOne({ where: { species_id: id + '' } })
    if (!existSpecies)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)

    return await this.speciesRepository
      .createQueryBuilder('species')
      .softDelete()
      .where("species_id = :id", { id: id })
      .execute()
  }

  async getListRemovedElements(): Promise<Species[]> {
    return await this.speciesRepository.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
  }

  async restore(id: number): Promise<Species> {
    const result: UpdateResult = await this.speciesRepository
      .createQueryBuilder('species')
      .restore()
      .where("species_id = :id", { id: id })
      .execute()
    if (!result.affected)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return await this.speciesRepository.findOne({ where: { species_id: id + '' } })
  }

  async removeAll(): Promise<DeleteResult> {
    console.log('removeAllSpecies !!!')
    return await this.speciesRepository
      .createQueryBuilder('species')
      .delete()
      .from(Species)
      .execute();
  }

}
