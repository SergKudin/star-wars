import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starships } from './entities/starship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { SwapiResponse } from 'src/types/swapi-response.type';

@Injectable()
export class StarshipsService {
  updatePeopleRelations(obj: CreateStarshipDto[]) {
    throw new Error('Method not implemented.');
  }
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
      starship_id: true,
      name: true,
      model: true,
      starship_class: true,
      manufacturer: true,
      cost_in_credits: true,
      length: true,
      crew: true,
      passengers: true,
      max_atmosphering_speed: true,
      hyperdrive_rating: true,
      MGLT: true,
      cargo_capacity: true,
      consumables: true,
      url: true,
      createdAt: true,
      updatedAt: true,
      films: { film_id: true, title: true },
      pilots: { _id: true, name: true },
      photos: { photo_id: true, originalname: true },
    },
    relations: {
      films: true,
      pilots: true,
      photos: true,
    },
  }


  async createStarship(createStarshipDto: CreateStarshipDto): Promise<Starships> {
    const existStarship: Starships = await this.starshipsRepository.findOne({ where: { url: createStarshipDto.url } });
    if (existStarship)
      throw new NotFoundException(`This Starship: ${createStarshipDto.name} with url: ${createStarshipDto.url} already exists`);

    return this.saveStarshipWithLinks(createStarshipDto);
  }

  async updateStarship(id: string, updateStarshipDto: UpdateStarshipDto): Promise<Starships> {
    const existStarshipUrl: Starships = await this.starshipsRepository.findOne({ where: { url: updateStarshipDto.url } });
    if (!existStarshipUrl)
      throw new NotFoundException(`Bad request! Check Your data: url ${updateStarshipDto.url} not found`);
    if (existStarshipUrl.starship_id !== id)
      throw new BadRequestException(`Bad request! Check Your data: found url ${existStarshipUrl.url} with id: ${existStarshipUrl.starship_id}`);

    updateStarshipDto.starship_id = id;
    return this.saveStarshipWithLinks(updateStarshipDto);
  }

  async saveStarshipWithLinks(starshipData: CreateStarshipDto | UpdateStarshipDto): Promise<Starships> {
    const { films, pilots, ...rest } = starshipData;

    // Save the Starship object with no links    
    const savedStarship = await this.starshipsRepository.save(rest);

    // Get instances of related objects from repositories & Establish links between objects    
    if (films) savedStarship.films = await this.filmsRepository.find({ where: { url: In(films) } });
    if (pilots) savedStarship.pilots = await this.peopleRepository.find({ where: { url: In(pilots) } });

    // Save the updated Starship object with the relationships set    
    return this.starshipsRepository.save(savedStarship);
  }

  async createStarshipObj(createStarshipDto: CreateStarshipDto[]): Promise<Starships[]> {

    const savedStarships: Starships[] = [];

    // Save Starship Objects Without Relationships    
    for (let dto of createStarshipDto) {
      savedStarships.push(await this.createStarship(dto))
    }
    return savedStarships;
  }

  async updateStarshipRelations(createStarshipDto: CreateStarshipDto[]): Promise<Starships[]> {
    const savedStarships: Starships[] = [];

    for (const dto of createStarshipDto) {

      let existingStarship: Starships = await this.starshipsRepository.findOne({ where: { url: dto.url } });

      if (!existingStarship) {
        const { films, pilots, ...rest } = dto
        existingStarship = await this.starshipsRepository.save(rest);
        console.error(`Starship ${dto.name} not found. Create new data Starship`);
      }
      savedStarships.push(await this.saveStarshipWithLinks(dto));
    }
    return savedStarships;
  }

  async getAllWithPagination(route: string, page: number, pageLimit: number): Promise<SwapiResponse<Starships>> {
    // limit - elements by page
    const { countStr }: { countStr: string } = await this.starshipsRepository
      .createQueryBuilder('starships')
      .select('COUNT(starship_id) AS countStr')
      .getRawOne()
    const count: number = +countStr
    const indexStart: number = (page - 1) * pageLimit
    route = process.env.IP + route.split('/').slice(0, -1).join('/') + '/'
    const next: string = (page * pageLimit < count) ? route + (page + 1) : 'null'
    const previous: string = (page < 2) ? 'null' : route + (page - 1)
    const results: Starships[] = await this.starshipsRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      skip: indexStart,
      take: pageLimit,
    })
    return { count, next, previous, results }
  }

  async getById(id: number): Promise<Starships> {
    const existStarship: Starships[] = await this.starshipsRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      where: { starship_id: id + '' }
    })
    if (!existStarship)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return existStarship[0]
  }

  async remove(id: number): Promise<UpdateResult> {
    const existStarship: Starships = await this.starshipsRepository.findOne({ where: { starship_id: id + '' } })
    if (!existStarship)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)

    return await this.starshipsRepository
      .createQueryBuilder('starships')
      .softDelete()
      .where("starship_id = :id", { id: id })
      .execute()
  }

  async getListRemovedElements(): Promise<Starships[]> {
    return await this.starshipsRepository.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
  }

  async restore(id: number): Promise<Starships> {
    const result: UpdateResult = await this.starshipsRepository
      .createQueryBuilder('starships')
      .restore()
      .where("starship_id = :id", { id: id })
      .execute()
    if (!result.affected)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return await this.starshipsRepository.findOne({ where: { starship_id: id + '' } })
  }

  async removeAll(): Promise<DeleteResult> {
    console.log('removeAllStarship !!!')
    return await this.starshipsRepository
      .createQueryBuilder('starships')
      .delete()
      .from(Starships)
      .execute();
  }

}
