import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Starships } from './entities/starship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';

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


  create(createStarshipDto: CreateStarshipDto) {
    return 'This action adds a new starship';
  }

  async createStarshipWithoutRelations(createStarshipDto: CreateStarshipDto[]): Promise<Starships[]> {

    const savedStarships: Starships[] = [];

    // Save Starships Objects Without Relationships    
    for (let dto of createStarshipDto) {
      const existStarships = await this.starshipsRepository.findOne({ where: { url: dto.url } })
      if (existStarships)
        throw new BadRequestException(`This Starships: ${dto.name} with url: ${dto.url} already exists`)

      const { films, pilots, ...rest } = dto;

      const savedStarship = await this.starshipsRepository.save(rest);
      savedStarships.push(savedStarship);
    }
    return savedStarships;
  }

  async updateStarshipRelations(createStarshipDto: CreateStarshipDto[]): Promise<Starships[]> {
    const savedStarship: Starships[] = [];

    for (const dto of createStarshipDto) {

      const { films, pilots, url } = dto;
      let existingStarship = await this.starshipsRepository.findOne({ where: { url } });

      if (!existingStarship) {
        const { films, pilots, ...rest } = dto
        existingStarship = await this.starshipsRepository.save(rest);
        console.error(`Starship ${dto.name} not found. Create new data Starship`);
      }

      existingStarship.films = await this.filmsRepository.find({ where: { url: In(films) } });
      existingStarship.pilots = await this.peopleRepository.find({ where: { url: In(pilots) } });

      const toSave = await this.starshipsRepository.save(existingStarship);
      savedStarship.push(toSave);
      // console.log('toSave Starship - ' + toSave.name)
    }
    return savedStarship;
  }





  findAll() {
    return `This action returns all starships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} starship`;
  }

  update(id: number, updateStarshipDto: UpdateStarshipDto) {
    return `This action updates a #${id} starship`;
  }

  remove(id: number) {
    return `This action removes a #${id} starship`;
  }

  async removeAll() {
    console.log('removeAllStarships !!!')
    return await this.starshipsRepository
      .createQueryBuilder('starships')
      .delete()
      .from(Starships)
      .execute();
  }

}
