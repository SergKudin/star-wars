import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';

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


  create(createSpeciesDto: CreateSpeciesDto) {
    return 'This action adds a new species';
  }



  async createSpeciesWithoutRelations(createSpeciesDto: CreateSpeciesDto[]): Promise<Species[]> {

    const savedSpecies: Species[] = [];

    // Save Speciess Objects Without Relationships    
    for (let dto of createSpeciesDto) {
      const existSpecies = await this.speciesRepository.findOne({ where: { url: dto.url } })
      if (existSpecies)
        throw new BadRequestException(`This Specie: ${dto.name} with url: ${dto.url} already exists`)

      const { people, films, homeworld, ...rest } = dto;

      const toSave = await this.speciesRepository.save(rest);
      savedSpecies.push(toSave);
    }
    return savedSpecies;
  }

  async updateSpeciesRelations(createSpeciesDto: CreateSpeciesDto[]): Promise<Species[]> {
    const savedSpecies: Species[] = [];

    for (const dto of createSpeciesDto) {

      const { people, films, homeworld, url } = dto;
      let existingSpecies = await this.speciesRepository.findOne({ where: { url } });

      if (!existingSpecies) {
        const { people, films, homeworld, ...rest } = dto
        existingSpecies = await this.speciesRepository.save(rest);
        console.error(`Species ${dto.name} not found. Create new data Species`);
      }

      existingSpecies.homeworld = await this.planetRepository.findOne({ where: { url: homeworld } });
      existingSpecies.people = await this.peopleRepository.find({ where: { url: In(people) } });
      existingSpecies.films = await this.filmsRepository.find({ where: { url: In(films) } });

      const toSave = await this.speciesRepository.save(existingSpecies);
      savedSpecies.push(toSave);
      // console.log('toSave Species - ' + toSave.name)
    }
    return savedSpecies;
  }




  findAll() {
    return `This action returns all species`;
  }

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }

  update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    return `This action updates a #${id} species`;
  }

  remove(id: number) {
    return `This action removes a #${id} species`;
  }

  async removeAll() {
    console.log('removeAllSpecies !!!')
    return await this.speciesRepository
      .createQueryBuilder('species')
      .delete()
      .from(Species)
      .execute();
  }


}
