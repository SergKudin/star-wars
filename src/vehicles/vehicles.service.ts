import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';

@Injectable()
export class VehiclesService {
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


  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicle';
  }

  async createVehicleWithoutRelations(createVehicleDto: CreateVehicleDto[]): Promise<Vehicles[]> {

    const savedVehicles: Vehicles[] = [];

    // Save Vehicles Objects Without Relationships    
    for (let dto of createVehicleDto) {
      const existVehicles = await this.vehiclesRepository.findOne({ where: { url: dto.url } })
      if (existVehicles)
        throw new BadRequestException(`This Vehicles: ${dto.name} with url: ${dto.url} already exists`)

      const { films, pilots, ...rest } = dto;

      const savedVehicle = await this.vehiclesRepository.save(rest);
      savedVehicles.push(savedVehicle);
    }
    return savedVehicles;
  }

  async updateVehicleRelations(createVehicleDto: CreateVehicleDto[]): Promise<Vehicles[]> {
    const savedVehicle: Vehicles[] = [];

    for (const dto of createVehicleDto) {

      const { films, pilots, url } = dto;
      let existingVehicle = await this.vehiclesRepository.findOne({ where: { url } });

      if (!existingVehicle) {
        const { films, pilots, ...rest } = dto
        existingVehicle = await this.vehiclesRepository.save(rest);
        console.error(`Vehicle ${dto.name} not found. Create new data Vehicle`);
      }

      existingVehicle.films = await this.filmsRepository.find({ where: { url: In(films) } });
      existingVehicle.pilots = await this.peopleRepository.find({ where: { url: In(pilots) } });

      const toSave = await this.vehiclesRepository.save(existingVehicle);
      savedVehicle.push(toSave);
      // console.log('toSave Vehicle - ' + toSave.name)
    }
    return savedVehicle;
  }




  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }

  async removeAll() {
    console.log('removeAllVehicles !!!')
    return await this.vehiclesRepository
      .createQueryBuilder('Vehicles')
      .delete()
      .from(Vehicles)
      .execute();
  }

}
