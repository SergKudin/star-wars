import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, In, IsNull, Not, Repository, UpdateResult } from 'typeorm'

import { CreatePeopleDto } from './dto/create-people.dto'
import { UpdatePeopleDto } from './dto/upate-people.dto'
import { SwapiResponse } from 'src/types/swapiResponse.type'
import { People } from './entities/people.entity'
import { Planet } from 'src/planets/entities/planet.entity'
import { Films } from 'src/films/entities/film.entity'
import { Species } from 'src/species/entities/species.entity'
import { Vehicles } from 'src/vehicles/entities/vehicle.entity'
import { Starships } from 'src/starships/entities/starship.entity'

@Injectable()
export class PeopleService {
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
      _id: true,
      name: true,
      birth_year: true,
      eye_color: true,
      gender: true,
      hair_color: true,
      height: true,
      mass: true,
      skin_color: true,
      url: true,
      createdAt: true,
      updatedAt: true,
      films: { film_id: true, title: true },
      species: { species_id: true, name: true },
      starships: { starship_id: true, name: true },
      vehicles: { vehicle_id: true, name: true },
      homeworld: { planet_id: true, name: true },
      photos: { photo_id: true, originalname: true },
    },
    relations: {
      films: true,
      photos: true,
      homeworld: true,
      species: true,
      starships: true,
      vehicles: true,
    },
  }

  async createPeople(createPeopleDto: CreatePeopleDto): Promise<People> {
    const existPeople: People = await this.peopleRepository.findOne({ where: { url: createPeopleDto.url } });
    if (existPeople)
      throw new NotFoundException(`This People: ${createPeopleDto.name} with url: ${createPeopleDto.url} already exists`);

    return this.savePeopleWithLinks(createPeopleDto);
  }

  async updatePeople(id: string, updatePeopleDto: UpdatePeopleDto): Promise<People> {
    const existPeopleUrl: People = await this.peopleRepository.findOne({ where: { url: updatePeopleDto.url } });
    if (!existPeopleUrl)
      throw new NotFoundException(`Bad request! Check Your data: url ${updatePeopleDto.url} not found`);
    if (existPeopleUrl._id !== id)
      throw new BadRequestException(`Bad request! Check Your data: found url ${existPeopleUrl.url} with id: ${existPeopleUrl._id}`);

    updatePeopleDto._id = id;
    return this.savePeopleWithLinks(updatePeopleDto);
  }

  async savePeopleWithLinks(peopleData: CreatePeopleDto | UpdatePeopleDto): Promise<People> {
    const { homeworld, films, species, vehicles, starships, ...rest } = peopleData;

    // Save the People object with no links    
    const savedPeople = await this.peopleRepository.save(rest);

    // Get instances of related objects from repositories & Establish links between objects    
    if (homeworld) savedPeople.homeworld = await this.planetRepository.findOne({ where: { url: homeworld } });
    if (films) savedPeople.films = await this.filmsRepository.find({ where: { url: In(films) } });
    if (species) savedPeople.species = await this.speciesRepository.find({ where: { url: In(species) } });
    if (starships) savedPeople.starships = await this.starshipsRepository.find({ where: { url: In(starships) } });
    if (vehicles) savedPeople.vehicles = await this.vehiclesRepository.find({ where: { url: In(vehicles) } });

    // Save the updated People object with the relationships set    
    return this.peopleRepository.save(savedPeople);
  }

  async createPeopleObj(createPeopleDto: CreatePeopleDto[]): Promise<People[]> {

    const savedPeople: People[] = [];

    // Save People Objects Without Relationships    
    for (let dto of createPeopleDto) {
      // const existPeople: People = await this.peopleRepository.findOne({ where: { url: dto.url } })
      // if (existPeople)
      //   throw new BadRequestException(`This People: ${dto.name} with url: ${dto.url} already exists`)
      // const { homeworld, films, species, vehicles, starships, ...rest } = dto;

      // const savedPerson: People = await this.peopleRepository.save(rest);
      // savedPeople.push(savedPerson);
      savedPeople.push(await this.createPeople(dto))
    }
    return savedPeople;
  }

  async updatePeopleRelations(createPeopleDto: CreatePeopleDto[]): Promise<People[]> {
    const savedPeople: People[] = [];

    for (const dto of createPeopleDto) {

      let existingPeople: People = await this.peopleRepository.findOne({ where: { url: dto.url } });

      if (!existingPeople) {
        const { homeworld, films, species, vehicles, starships, ...rest } = dto
        existingPeople = await this.peopleRepository.save(rest);
        console.error(`People ${dto.name} not found. Create new data people`);
      }
      savedPeople.push(await this.savePeopleWithLinks(dto));
    }
    return savedPeople;
  }

  async getAllWithPagination(route: string, page: number, pageLimit: number): Promise<SwapiResponse<People>> {
    // limit - elements by page
    // route = request.url
    const { countStr }: { countStr: string } = await this.peopleRepository
      .createQueryBuilder('people')
      .select('COUNT(_id) AS countStr')
      .getRawOne()
    const count: number = +countStr
    const indexStart: number = (page - 1) * pageLimit
    route = process.env.IP + route.split('/').slice(0, -1).join('/') + '/'
    const next: string = (page * pageLimit < count) ? route + (page + 1) : 'null'
    const previous: string = (page < 2) ? 'null' : route + (page - 1)
    const results: People[] = await this.peopleRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      skip: indexStart,
      take: pageLimit,
    })
    return { count, next, previous, results }
  }

  async getById(id: number): Promise<People> {
    const existPeople: People[] = await this.peopleRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      where: { _id: id + '' }
    })
    if (!existPeople)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return existPeople[0]
  }

  async remove(id: number): Promise<UpdateResult> {
    const existPeople: People = await this.peopleRepository.findOne({ where: { _id: id + '' } })
    if (!existPeople)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)

    return await this.peopleRepository
      .createQueryBuilder('people')
      .softDelete()
      .where("_id = :id", { id: id })
      .execute()
  }

  async getListRemovedElements(): Promise<People[]> {
    return await this.peopleRepository.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
  }

  async restore(id: number): Promise<People> {
    const result: UpdateResult = await this.peopleRepository
      .createQueryBuilder('people')
      .restore()
      .where("_id = :id", { id: id })
      .execute()
    if (!result.affected)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return await this.peopleRepository.findOne({ where: { _id: id + '' } })
  }

  async removeAll(): Promise<DeleteResult> {
    console.log('removeAllPeople !!!')
    return await this.peopleRepository
      .createQueryBuilder('people')
      .delete()
      .from(People)
      .execute();
  }

}
