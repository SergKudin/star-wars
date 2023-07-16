import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { firstValueFrom } from 'rxjs'
import { Repository } from 'typeorm'

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
import { FilmsService } from 'src/films/films.service'
import { PlanetsService } from 'src/planets/planets.service'
import { SpeciesService } from 'src/species/species.service'
import { VehiclesService } from 'src/vehicles/vehicles.service'
import { StarshipsService } from 'src/starships/starships.service'
import { migrPeopleData } from './data-for-test/migration.testPeople'
import { migrFilmsData } from './data-for-test/migration.testFilm'
import { migrPlanetsData } from './data-for-test/migration.testPlanet'
import { migrSpeciesData } from './data-for-test/migration.testSpecies'
import { migrStarshipsData } from './data-for-test/migration.testStarships'
import { migrVihiclesData } from './data-for-test/migration.testVihicles'

@Injectable()
export class MigrationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly peopleService: PeopleService,
    private readonly filmService: FilmsService,
    private readonly planetsService: PlanetsService,
    private readonly speciesService: SpeciesService,
    private readonly vehiclesService: VehiclesService,
    private readonly starshipsService: StarshipsService,
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
  useTestData = true

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

  private createSwapiSummObjWithoutRelations = {
    people: async (obj: CreatePeopleDto[]) => {
      await this.peopleService.createPeopleWithoutRelations(obj)
    },
    planets: async (obj: CreatePlanetDto[]) => {
      await this.planetsService.createPlanetWithoutRelations(obj)
    },
    films: async (obj: CreateFilmDto[]) => {
      await this.filmService.createFilmWithoutRelations(obj)
    },
    species: async (obj: CreateSpeciesDto[]) => {
      await this.speciesService.createSpeciesWithoutRelations(obj)
    },
    vehicles: async (obj: CreateVehicleDto[]) => {
      await this.vehiclesService.createVehicleWithoutRelations(obj)
    },
    starships: async (obj: CreateStarshipDto[]) => {
      await this.starshipsService.createStarshipWithoutRelations(obj)
    },
  }

  private updateSwapiSummObjRelations = {
    people: async (obj: CreatePeopleDto[]) => {
      await this.peopleService.updatePeopleRelations(obj)
    },
    planets: async (obj: CreatePlanetDto[]) => {
      await this.planetsService.updatePlanetRelations(obj)
    },
    films: async (obj: CreateFilmDto[]) => {
      await this.filmService.updateFilmRelations(obj)
    },
    species: async (obj: CreateSpeciesDto[]) => {
      await this.speciesService.updateSpeciesRelations(obj)
    },
    vehicles: async (obj: CreateVehicleDto[]) => {
      await this.vehiclesService.updateVehicleRelations(obj)
    },
    starships: async (obj: CreateStarshipDto[]) => {
      await this.starshipsService.updateStarshipRelations(obj)
    },
  }

  async clearDB(clearDB: boolean) {
    if (!clearDB) return
    console.log(`ATTENTION!!! Database cleanup in progress!`)
    let clear: number
    do {
      try {
        clear = (await this.peopleService.removeAll()).affected
        clear += (await this.filmService.removeAll()).affected

        clear += (await this.starshipsService.removeAll()).affected
        clear += (await this.vehiclesService.removeAll()).affected
        clear += (await this.speciesService.removeAll()).affected
        clear += (await this.planetsService.removeAll()).affected
      } catch (e) { }
    } while (clear > 0)
  }


  async createAllObjectsToDB() {

    const remove: string = process.env.CLEAR_DB_BEFORE_WRITING_DATA_FROM_SWAPI ?? 'true'
    const clearDB: boolean = (remove === 'true') ? true : false
    await this.clearDB(clearDB)

    // for start test
    if (this.useTestData) {
      console.log(`Use test data`)
      this.migrationData.set('people', migrPeopleData as unknown as CreatePeopleDto[])
      this.migrationData.set('planets', migrPlanetsData as unknown as CreatePlanetDto[])
      this.migrationData.set('films', migrFilmsData as unknown as CreateFilmDto[])
      this.migrationData.set('species', migrSpeciesData as unknown as CreateSpeciesDto[])
      this.migrationData.set('vehicles', migrVihiclesData as unknown as CreateVehicleDto[])
      this.migrationData.set('starships', migrStarshipsData as unknown as CreateStarshipDto[])
    } else {
      await this.getAllDataFromSwapi()
    }

    for (const sourse of this.migrationData) {
      const key = sourse[0];
      console.log(`Start creating ${key}`);
      if (key) {
        await this.createSwapiSummObjWithoutRelations[key](sourse[1])
        console.log(` While creating ${key} success`);
      }
    }

    for (const sourse of this.migrationData) {
      const key = sourse[0];
      console.log(`Start creating relations ${key}`);
      if (key) {
        await this.updateSwapiSummObjRelations[key](sourse[1])
        console.log(` While creating relations ${key} success`);
      }
    }

  }


}

