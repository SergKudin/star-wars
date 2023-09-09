import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { createFakeRepository } from 'src/data-test/repository-test.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicles } from './entities/vehicle.entity';
import * as vehiclesData from "../data-test/data/vehicles.json"
import * as peopleData from "../data-test/data/people.json"
import * as filmsData from "../data-test/data/films.json"
import { Repository } from 'typeorm';
import { People } from 'src/people/entities/people.entity';
import { Films } from 'src/films/entities/film.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: VehiclesService;
  let fakeVehiclesRepository: Partial<Repository<Vehicles>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(Vehicles),
          useValue: createFakeRepository(vehiclesData),
        },
        {
          provide: getRepositoryToken(People),
          useValue: createFakeRepository(peopleData),
        },
        {
          provide: getRepositoryToken(Films),
          useValue: createFakeRepository(filmsData),
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = module.get<VehiclesService>(VehiclesService);
    fakeVehiclesRepository = module.get<Repository<Vehicles>>(getRepositoryToken(Vehicles));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getByIdVehicle', async () => {
    const id = 1;
    const vehicleData = await fakeVehiclesRepository.findOne({ where: { vehicle_id: id + '' } });

    jest.spyOn(service, 'getById').mockResolvedValue(vehicleData);

    const result = await controller.getById(id);
    expect(result).toBe(vehicleData);
  })

  it('createVehicle', async () => {
    const id = 1;
    const vehicleData = await fakeVehiclesRepository.findOne({ where: { vehicle_id: id + '' } });

    const { vehicle_id, photos, films, pilots, createdAt, updatedAt, deletedAt, ...rest } = vehicleData

    jest.spyOn(service, 'createVehicle').mockResolvedValue(vehicleData);

    const result = await controller.create(rest as CreateVehicleDto);
    expect(result).toStrictEqual({ createdAt, updatedAt, vehicle_id, ...rest });
  });

})
