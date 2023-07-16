import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';

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


  create(createPlanetDto: CreatePlanetDto) {
    return 'This action adds a new planet';
  }


  async createPlanetWithoutRelations(createPlanetDto: CreatePlanetDto[]): Promise<Planet[]> {

    const savedPlanets: Planet[] = [];

    // Save Planets Objects Without Relationships    
    for (let dto of createPlanetDto) {
      const existPlanets = await this.planetRepository.findOne({ where: { url: dto.url } })
      if (existPlanets)
        throw new BadRequestException(`This Planets: ${dto.name} with url: ${dto.url} already exists`)

      const { residents, films, ...rest } = dto;

      const savedPlanet = await this.planetRepository.save(rest);
      savedPlanets.push(savedPlanet);
    }
    return savedPlanets;
  }

  async updatePlanetRelations(createPlanetDto: CreatePlanetDto[]): Promise<Planet[]> {
    const savedPlanet: Planet[] = [];

    for (const dto of createPlanetDto) {

      const { residents, films, url } = dto;
      let existingPlanet = await this.planetRepository.findOne({ where: { url } });

      if (!existingPlanet) {
        const { residents, films, ...rest } = dto
        existingPlanet = await this.planetRepository.save(rest);
        console.error(`Planet ${dto.name} not found. Create new data Planet`);
      }

      existingPlanet.residents = await this.peopleRepository.find({ where: { url: In(residents) } });
      existingPlanet.films = await this.filmsRepository.find({ where: { url: In(films) } });

      const toSave = await this.planetRepository.save(existingPlanet);
      savedPlanet.push(toSave);
      // console.log('toSave Planet - ' + toSave.name)
    }
    return savedPlanet;
  }




  findAll() {
    return `This action returns all planets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planet`;
  }

  update(id: number, updatePlanetDto: UpdatePlanetDto) {
    return `This action updates a #${id} planet`;
  }

  remove(id: number) {
    return `This action removes a #${id} planet`;
  }

  async removeAll() {
    console.log('removeAllPlanets !!!')
    return await this.planetRepository
      .createQueryBuilder('planet')
      .delete()
      .from(Planet)
      .execute();
  }


}
