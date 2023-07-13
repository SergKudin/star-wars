import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { firstValueFrom } from 'rxjs'
import { CreateFilmDto } from 'src/films/dto/create-film.dto'
import { Films } from 'src/films/entities/film.entity'
import { CreatePeopleDto } from 'src/people/dto/create-people.dto'
import { People } from 'src/people/entities/people.entity'
import { PeopleService } from 'src/people/people.service'
import { CreatePlanetDto } from 'src/planets/dto/create-planet.dto'
import { Planet } from 'src/planets/entities/planet.entity'
import { CreateSpeciesDto } from 'src/species/dto/create-species.dto'
import { Species } from 'src/species/entities/species.entity'
import { CreateStarshipDto } from 'src/starships/dto/create-starship.dto'
import { Starships } from 'src/starships/entities/starship.entity'
import { SwapiResponse } from 'src/types/swapiResponse.type'
import { SwapiSummObj } from 'src/types/swapiSummObj.type'
import { CreateVehicleDto } from 'src/vehicles/dto/create-vehicle.dto'
import { Vehicles } from 'src/vehicles/entities/vehicle.entity'
import { Repository, getConnection } from 'typeorm'
import { migrPeopleData } from './migration.testPeople'

@Injectable()
export class MigrationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly peopleService: PeopleService,
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

  adrSwapi = process.env.SWAPI

  migrationData: Map<string, SwapiSummObj[]> = new Map<string, SwapiSummObj[]>([
    ['people', [] as CreatePeopleDto[]],
    ['planets', [] as CreatePlanetDto[]],
    ['films', [] as CreateFilmDto[]],
    ['species', [] as CreateSpeciesDto[]],
    ['vehicles', [] as CreateVehicleDto[]],
    ['starships', [] as CreateStarshipDto[]],
  ])

  async getDataFromSwapi<T extends SwapiSummObj>(objName: string): Promise<T[]> {
    const existingData = this.migrationData.get(objName) as T[]
    const newData = await this.getData(objName, existingData) as unknown as T[]
    this.migrationData.set(objName, newData)
    return this.migrationData.get(objName) as unknown as T[]
  }

  async getMigrationData(): Promise<{ [key: string]: SwapiSummObj[] }> {
    await this.getAllDataFromSwapi()
    return Object.fromEntries(this.migrationData)
  }

  async getAllDataFromSwapi() {
    for (let key of this.migrationData.keys()) {
      console.log(key)
      await this.getDataFromSwapi(key)
    }
  }

  async getData<T>(obj: string, arr: T[]): Promise<T[]> {
    const a: T[] = []
    if (arr === undefined) arr = a
    let next: string = this.adrSwapi + obj
    console.log(next)
    let { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<T>>(next)
    )
    next = data.next
    arr.push(...data.results)
    while (next !== null) {
      console.log(next)
      let { data } = await firstValueFrom(
        this.httpService.get<SwapiResponse<T>>(next)
      )
      next = data.next
      arr.push(...data.results)
    }
    return arr
  }

  private objHandlers = {
    people: async (obj: CreatePeopleDto[]) => {
      console.log('Processing CreatePeopleDto')
      await this.peopleService.createPeopleWithoutRelations(obj)
    },
    planets: (obj: CreatePlanetDto[]) => {
      console.log('Processing CreatePlanetDto' + JSON.stringify(obj))
    },
    films: (obj: CreateFilmDto[]) => {
      console.log('Processing CreateFilmDto:' + JSON.stringify(obj))
    },
    species: (obj: CreateSpeciesDto[]) => {
      console.log('Processing CreateSpeciesDto:' + JSON.stringify(obj))
    },
    vehicles: (obj: CreateVehicleDto[]) => {
      console.log('Processing CreateVehicleDto:' + JSON.stringify(obj))
    },
    starships: (obj: CreateStarshipDto[]) => {
      console.log('Processing CreateStarshipDto')
    },
  }

  // private repositories = {
  //   people: this.peopleRepository,
  //   planets: this.planetRepository,
  //   films: this.filmsRepository,
  //   species: this.speciesRepository,
  //   vehicles: this.vehiclesRepository,
  //   starships: this.starshipsRepository,
  // }

  // async createSourse(key: string, obj: SwapiSummObj): Promise<void> {
  //   if (key) {
  //     await this.objHandlers[key](obj)
  //   }
  // }

  // async clearDB(): Promise<void> {
  //   this.migrationData.forEach(async (arrObj, key) => {
  //     if (key) {
  //       await this.dbClear[key]()
  //     }
  //   })
  // }

  // async createAllObjectsToDB1() {
  //   // await this.getAllDataFromSwapi()

  //   // await this.clearDB()

  //   this.migrationData.forEach((arrObj, key) => {
  //     // console.log(key)
  //     arrObj.forEach(async obj => {
  //       await this.createSourse(key, obj)
  //     })
  //   })
  // }


  // ...

  async createAllObjectsToDB() {

    await this.peopleService.removeAll()

    this.migrationData.set('people', migrPeopleData)

    for (const sourse of this.migrationData) {
      const key = sourse[0];
      console.log(`Start creating ${key}`);
      // const arrObj = sourse[1];
      if (key) {
        // const queryRunner = this.repositories[key].manager.connection.createQueryRunner()

        // await queryRunner.startTransaction();

        // try {
        // for (const obj of arrObj) {
        //   await queryRunner.manager.save(obj);
        // }
        // await queryRunner.commitTransaction();
        // } catch (error) {
        //   console.error(`Error while creating ${key}:`, error);
        //   await queryRunner.rollbackTransaction();
        // } finally {
        //   await queryRunner.release();
        // }
        await this.objHandlers[key](sourse[1])
        console.log(`While creating ${key} success`);
      }
    }
  }


}

