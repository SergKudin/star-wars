import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { DeleteResult, In, IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { Films } from './entities/film.entity';
import { SwapiResponse } from 'src/types/swapiResponse.type';

@Injectable()
export class FilmsService {
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
      film_id: true,
      title: true,
      episode_id: true,
      opening_crawl: true,
      director: true,
      producer: true,
      release_date: true,
      url: true,
      createdAt: true,
      updatedAt: true,
      species: { species_id: false, name: false },
      starships: { starship_id: false, name: false },
      vehicles: { vehicle_id: false, name: false },
      characters: { _id: false, name: false },
      planets: { planet_id: false, name: false },
      photos: { photo_id: false, originalname: false },
    },
    relations: {
      characters: false,
      photos: false,
      planets: false,
      species: false,
      starships: false,
      vehicles: false,
    },
  }

  async createFilms(createFilmDto: CreateFilmDto): Promise<Films> {
    let existFilm: Films = await this.filmsRepository.findOne({ select: { url: true }, where: { url: createFilmDto.url } });
    if (existFilm)
      throw new NotFoundException(`This Film: ${createFilmDto.title} with url: ${createFilmDto.url} already exists`);
    if (createFilmDto.film_id) {
      existFilm = await this.filmsRepository.findOne({ select: { film_id: true }, where: { film_id: createFilmDto.film_id } });
      if (existFilm)
        throw new BadRequestException(`Bad request! Check Your data: with id: ${existFilm.film_id} already exists`);
    }
    return this.saveFilmWithLinks(createFilmDto);
  }

  async updateFilm(id: string, updateFilmDto: UpdateFilmDto): Promise<Films> {
    const existFilmUrl: Films = await this.filmsRepository.findOne({ where: { film_id: id } });
    // if (!existFilmUrl)
    //   throw new NotFoundException(`Bad request! Check Your data: url ${updateFilmDto.url} not found`);
    if (existFilmUrl)
      throw new BadRequestException(`Bad request! Check Your data: found url ${existFilmUrl.url} with id: ${existFilmUrl.film_id}`);

    updateFilmDto.film_id = id;
    return this.saveFilmWithLinks(updateFilmDto);
  }

  async saveFilmWithLinks(filmData: CreateFilmDto | UpdateFilmDto): Promise<Films> {
    const { species, starships, vehicles, characters, planets, ...rest } = filmData;

    // Save the Film object with no links    
    const savedFilm = await this.filmsRepository.save(rest);

    // Get instances of related objects from repositories & Establish links between objects    
    if (planets) savedFilm.planets = await this.planetRepository.find({ where: { url: In(planets) } });
    if (characters) savedFilm.characters = await this.peopleRepository.find({ where: { url: In(characters) } });
    if (species) savedFilm.species = await this.speciesRepository.find({ where: { url: In(species) } });
    if (starships) savedFilm.starships = await this.starshipsRepository.find({ where: { url: In(starships) } });
    if (vehicles) savedFilm.vehicles = await this.vehiclesRepository.find({ where: { url: In(vehicles) } });

    // Save the updated Film object with the relationships set    
    return this.filmsRepository.save(savedFilm);
  }

  async createFilmObj(createFilmDto: CreateFilmDto[]): Promise<Films[]> {

    const savedFilm: Films[] = [];

    // Save Film Objects Without Relationships    
    for (let dto of createFilmDto) {
      // const existFilm: Films = await this.filmsRepository.findOne({ where: { url: dto.url } })
      // if (existFilm)
      //   throw new BadRequestException(`This Film: ${dto.title} with url: ${dto.url} already exists`)
      // const { species, starships, vehicles, characters, planets, ...rest } = dto;

      // const savedPerson: Films = await this.filmsRepository.save(rest);
      // savedFilm.push(savedPerson);
      savedFilm.push(await this.createFilms(dto))
    }
    return savedFilm;
  }

  async updateFilmRelations(createFilmDto: CreateFilmDto[]): Promise<Films[]> {
    const savedFilm: Films[] = [];

    for (const dto of createFilmDto) {

      let existingFilm: Films = await this.filmsRepository.findOne({ where: { url: dto.url } });

      if (!existingFilm) {
        const { species, starships, vehicles, characters, planets, ...rest } = dto
        existingFilm = await this.filmsRepository.save(rest);
        console.error(`Film ${dto.title} not found. Create new data Film`);
      }
      savedFilm.push(await this.saveFilmWithLinks(dto));
    }
    return savedFilm;
  }

  async getAllWithPagination(route: string, page: number, pageLimit: number): Promise<SwapiResponse<Films>> {
    // limit - elements by page
    // route = request.url
    const { countStr }: { countStr: string } = await this.filmsRepository
      .createQueryBuilder('films')
      .select('COUNT(film_id) AS countStr')
      .getRawOne()

    const count: number = +countStr
    const indexStart: number = (page - 1) * pageLimit
    route = process.env.IP + route.split('/').slice(0, -1).join('/') + '/'
    const next: string = (page * pageLimit < count) ? route + (page + 1) : 'null'
    const previous: string = (page < 2) ? 'null' : route + (page - 1)
    const results: Films[] = await this.filmsRepository.find({
      // select: this.query.select,
      // relations: this.query.relations,
      skip: indexStart,
      take: pageLimit,
    })
    return { count, next, previous, results }
  }

  async getById(id: number): Promise<Films> {
    const existFilm: Films[] = await this.filmsRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      where: { film_id: id + '' }
    })
    if (!existFilm)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return existFilm[0]
  }

  async remove(id: number): Promise<UpdateResult> {
    const existFilm: Films = await this.filmsRepository.findOne({ where: { film_id: id + '' } })
    if (!existFilm)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)

    return await this.filmsRepository
      .createQueryBuilder('films')
      .softDelete()
      .where("film_id = :id", { id: id })
      .execute()
  }

  async getListRemovedElements(): Promise<Films[]> {
    return await this.filmsRepository.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
  }

  async restore(id: number): Promise<Films> {
    const result: UpdateResult = await this.filmsRepository
      .createQueryBuilder('films')
      .restore()
      .where("film_id = :id", { id: id })
      .execute()
    if (!result.affected)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return await this.filmsRepository.findOne({ where: { film_id: id + '' } })
  }

  async removeAll() {
    console.log('removeAllFilms !!!')
    return await this.filmsRepository
      .createQueryBuilder('films')
      .delete()
      .from(Films)
      .execute();
  }

}
