import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { In, Repository } from 'typeorm';
import { Films } from './entities/film.entity';

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


  create(createFilmDto: CreateFilmDto) {
    return 'This action adds a new film';
  }

  async createFilmWithoutRelations(createFilmDto: CreateFilmDto[]): Promise<Films[]> {

    const savedFilms: Films[] = [];

    // Save Films Objects Without Relationships    
    for (let dto of createFilmDto) {
      const existFilms = await this.filmsRepository.findOne({ where: { url: dto.url } })
      if (existFilms)
        throw new BadRequestException(`This Films: ${dto.title} with url: ${dto.url} already exists`)

      const { species, starships, vehicles, characters, planets, ...rest } = dto;

      const savedFilm = await this.filmsRepository.save(rest);
      savedFilms.push(savedFilm);
    }
    return savedFilms;
  }

  async updateFilmRelations(createFilmDto: CreateFilmDto[]): Promise<Films[]> {
    const savedFilm: Films[] = [];

    for (const dto of createFilmDto) {

      const { species, starships, vehicles, characters, planets, url } = dto;
      let existingFilm = await this.filmsRepository.findOne({ where: { url } });

      if (!existingFilm) {
        const { species, starships, vehicles, characters, planets, ...rest } = dto
        existingFilm = await this.filmsRepository.save(rest);
        console.error(`Film ${dto.title} not found. Create new data Film`);
      }

      existingFilm.planets = await this.planetRepository.find({ where: { url: In(planets) } });
      existingFilm.characters = await this.peopleRepository.find({ where: { url: In(characters) } });
      existingFilm.species = await this.speciesRepository.find({ where: { url: In(species) } });
      existingFilm.starships = await this.starshipsRepository.find({ where: { url: In(starships) } });
      existingFilm.vehicles = await this.vehiclesRepository.find({ where: { url: In(vehicles) } });

      const toSave = await this.filmsRepository.save(existingFilm);
      savedFilm.push(toSave);
      // console.log('toSave Film - ' + toSave.title)
    }
    return savedFilm;
  }



  findAll() {
    return `This action returns all films`;
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
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
