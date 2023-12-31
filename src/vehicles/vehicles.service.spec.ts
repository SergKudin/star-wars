import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { createFakeRepository } from 'src/data-test/repository-test.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicles } from './entities/vehicle.entity';
import * as vehiclesData from "../data-test/data/vehicles.json"
import * as peopleData from "../data-test/data/people.json"
import * as filmsData from "../data-test/data/films.json"
import { People } from 'src/people/entities/people.entity';
import { Films } from 'src/films/entities/film.entity';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let fakeVehiclesRepository: Partial<Repository<Vehicles>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<VehiclesService>(VehiclesService);
    fakeVehiclesRepository = module.get<Repository<Vehicles>>(getRepositoryToken(Vehicles));
  });

  it('testing toBeDefined', () => {
    expect(service).toBeDefined();
  });

  for (let id = 1; id < 10; id++) {
    it(`getById with Id ${id}`, async () => {
      const result = await service.getById(id);
      expect(result).toEqual(vehiclesData[id - 1]);
    });
  }

  for (let id = 1; id < 10; id++) {
    it(`updateVehicle with Id ${id}`, async () => {
      const newName = 'test chenge name'
      let result: Vehicles | Vehicles[];
      const expected = await service.getById(id);
      const { photos, films, pilots, createdAt, updatedAt, deletedAt, name, ...rest } = expected
      await service.updateVehicle(id + '', { name: newName, ...rest } as UpdateVehicleDto);
      const res = await fakeVehiclesRepository.find({ where: { vehicle_id: id + '' } });
      (res.length > 1) ? result = res : result = res[0]
      expect(result).toEqual({ name: newName, ...rest } as Vehicles);
    });
  }

  for (let id = 1; id < 10; id++) {
    it(`createVehicle with Id ${id}`, async () => {
      let result: Vehicles | Vehicles[];
      const expected = await service.getById(id);
      const { photos, films, pilots, createdAt, updatedAt, deletedAt, vehicle_id, url, ...rest } = expected
      const newId = (id + 10) + ''
      const newUrl = url + newId + '/'
      await service.createVehicle({ vehicle_id: newId, url: newUrl, ...rest } as CreateVehicleDto);
      const res = await fakeVehiclesRepository.find({ where: { vehicle_id: newId } });
      (res.length > 1) ? result = res : result = res[0]
      expect(result).toEqual({ vehicle_id: newId, url: newUrl, ...rest } as Vehicles);
    });
  }

});

