import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, IsNull, Not, Repository, UpdateResult } from 'typeorm';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicles } from './entities/vehicle.entity';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { SwapiResponse } from 'src/types/swapi-response.type';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    // @InjectRepository(Planet)
    // private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    // @InjectRepository(Species)
    // private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
    // @InjectRepository(Starships)
    // private readonly starshipsRepository: Repository<Starships>,
  ) { }

  query = {
    select: {
      vehicle_id: true,
      name: true,
      model: true,
      vehicle_class: true,
      manufacturer: true,
      length: true,
      cost_in_credits: true,
      crew: true,
      passengers: true,
      max_atmosphering_speed: true,
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

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicles> {
    const existVehicle: Vehicles = await this.vehiclesRepository.findOne({ where: { url: createVehicleDto.url } });
    if (existVehicle)
      throw new NotFoundException(`This Vehicle: ${createVehicleDto.name} with url: ${createVehicleDto.url} already exists`);

    return this.saveVehicleWithLinks(createVehicleDto);
  }

  async updateVehicle(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicles> {
    const existVehicleUrl: Vehicles = await this.vehiclesRepository.findOne({ where: { url: updateVehicleDto.url } });
    if (!existVehicleUrl)
      throw new NotFoundException(`Bad request! Check Your data: url ${updateVehicleDto.url} not found`);
    if (existVehicleUrl.vehicle_id !== id)
      throw new BadRequestException(`Bad request! Check Your data: found url ${existVehicleUrl.url} with id: ${existVehicleUrl.vehicle_id}`);

    updateVehicleDto.vehicle_id = id;
    return this.saveVehicleWithLinks(updateVehicleDto);
  }

  async saveVehicleWithLinks(VehicleData: CreateVehicleDto | UpdateVehicleDto): Promise<Vehicles> {
    const { films, pilots, ...rest } = VehicleData;

    const savedVehicle: Vehicles = await this.vehiclesRepository.save(rest);

    if (films) savedVehicle.films = await this.filmsRepository.find({ where: { url: In(films) } });
    if (pilots) savedVehicle.pilots = await this.peopleRepository.find({ where: { url: In(pilots) } });

    return this.vehiclesRepository.save(savedVehicle);
  }

  async createVehicleObj(createVehicleDto: CreateVehicleDto[]): Promise<Vehicles[]> {

    const savedVehicles: Vehicles[] = [];

    for (let dto of createVehicleDto) {

      savedVehicles.push(await this.createVehicle(dto))
    }
    return savedVehicles;
  }

  async updateVehicleRelations(createVehicleDto: CreateVehicleDto[]): Promise<Vehicles[]> {
    const savedVehicles: Vehicles[] = [];

    for (const dto of createVehicleDto) {

      let existingVehicle: Vehicles = await this.vehiclesRepository.findOne({ where: { url: dto.url } });

      if (!existingVehicle) {
        const { films, pilots, ...rest } = dto
        existingVehicle = await this.vehiclesRepository.save(rest);
        console.error(`Vehicle ${dto.name} not found. Create new data Vehicle`);
      }
      savedVehicles.push(await this.saveVehicleWithLinks(dto));
    }
    return savedVehicles;
  }

  async getAllWithPagination(route: string, page: number, pageLimit: number): Promise<SwapiResponse<Vehicles>> {
    // limit - elements by page
    const { countStr }: { countStr: string } = await this.vehiclesRepository
      .createQueryBuilder('vehicles')
      .select('COUNT(vehicle_id) AS countStr')
      .getRawOne()
    const count: number = +countStr
    const indexStart: number = (page - 1) * pageLimit
    route = process.env.IP + route.split('/').slice(0, -1).join('/') + '/'
    const next: string = (page * pageLimit < count) ? route + (page + 1) : 'null'
    const previous: string = (page < 2) ? 'null' : route + (page - 1)
    const results: Vehicles[] = await this.vehiclesRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      skip: indexStart,
      take: pageLimit,
    })
    return { count, next, previous, results }
  }

  async getById(id: number): Promise<Vehicles> {
    const existVehicle: Vehicles[] = await this.vehiclesRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      where: { vehicle_id: id + '' }
    })
    if (!existVehicle)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return existVehicle[0]
  }

  async remove(id: number): Promise<UpdateResult> {
    const existVehicle: Vehicles = await this.vehiclesRepository.findOne({ where: { vehicle_id: id + '' } })
    if (!existVehicle)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)

    return await this.vehiclesRepository
      .createQueryBuilder('vehicles')
      .softDelete()
      .where("vehicle_id = :id", { id: id })
      .execute()
  }

  async getListRemovedElements(): Promise<Vehicles[]> {
    return await this.vehiclesRepository.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
  }

  async restore(id: number): Promise<Vehicles> {
    const result: UpdateResult = await this.vehiclesRepository
      .createQueryBuilder('vehicles')
      .restore()
      .where("vehicle_id = :id", { id: id })
      .execute()
    if (!result.affected)
      throw new NotFoundException(`Bad request! Check You data: id ${id} not find`)
    return await this.vehiclesRepository.findOne({ where: { vehicle_id: id + '' } })
  }

  async removeAll(): Promise<DeleteResult> {
    console.log('removeAllVehicle !!!')
    return await this.vehiclesRepository
      .createQueryBuilder('vehicles')
      .delete()
      .from(Vehicles)
      .execute();
  }

}
