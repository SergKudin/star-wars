import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import { CreateFilmDto } from 'src/films/dto/create-film.dto'
import { CreatePeopleDto } from 'src/people/dto/create-people.dto'
import { PeopleService } from 'src/people/people.service'
import { CreatePlanetDto } from 'src/planets/dto/create-planet.dto'
import { CreateSpeciesDto } from 'src/species/dto/create-species.dto'
import { CreateStarshipDto } from 'src/starships/dto/create-starship.dto'
import { SwapiResponse } from 'src/types/swapiResponse.type'
import { SwapiSummObj } from 'src/types/swapiSummObj.type'
import { CreateVehicleDto } from 'src/vehicles/dto/create-vehicle.dto'
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
import { PhotoService } from 'src/photo/photo.service'

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
    private readonly photoService: PhotoService,
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

  private createSwapiSummObj = {
    people: async (obj: CreatePeopleDto[]) => {
      await this.peopleService.createPeopleObj(obj)
    },
    planets: async (obj: CreatePlanetDto[]) => {
      await this.planetsService.createPlanetObj(obj)
    },
    films: async (obj: CreateFilmDto[]) => {
      await this.filmService.createFilmObj(obj)
    },
    species: async (obj: CreateSpeciesDto[]) => {
      await this.speciesService.createSpeciesObj(obj)
    },
    vehicles: async (obj: CreateVehicleDto[]) => {
      await this.vehiclesService.createVehicleObj(obj)
    },
    starships: async (obj: CreateStarshipDto[]) => {
      await this.starshipsService.createStarshipObj(obj)
    },
  }

  async clearDB(clearDB: boolean, log: string[]): Promise<string[]> {
    if (!clearDB) return
    console.log(`ATTENTION!!! Database cleanup in progress!`)
    log.push(`ATTENTION!!! Database cleanup in progress!`)
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
    await this.photoService.removeAll()
    console.log(`All data is deleted!`)
    log.push(`All data is deleted!`)
    return log
  }


  async createAllObjectsToDB(): Promise<{ message: string[] }> {
    let log: string[] = []
    const remove: string = process.env.CLEAR_DB_BEFORE_WRITING_DATA_FROM_SWAPI ?? 'true'
    const clearDB: boolean = (remove === 'true') ? true : false
    log.push(`Removing all data from the database: ${clearDB}`)
    log = await this.clearDB(clearDB, log)

    // for start test
    if (this.useTestData) {
      // console.log(`Use test data`)
      log.push(`Use test data`)
      this.migrationData.set('people', migrPeopleData as unknown as CreatePeopleDto[])
      this.migrationData.set('planets', migrPlanetsData as unknown as CreatePlanetDto[])
      this.migrationData.set('films', migrFilmsData as unknown as CreateFilmDto[])
      this.migrationData.set('species', migrSpeciesData as unknown as CreateSpeciesDto[])
      this.migrationData.set('vehicles', migrVihiclesData as unknown as CreateVehicleDto[])
      this.migrationData.set('starships', migrStarshipsData as unknown as CreateStarshipDto[])
    } else {
      log.push(`Use data SWAPI`)
      await this.getAllDataFromSwapi()
    }

    for (const sourse of this.migrationData) {
      const key = sourse[0];
      // console.log(`Start creating ${key}`);
      log.push(`Start creating ${key}`)
      if (key) {
        await this.createSwapiSummObj[key](sourse[1])
        // console.log(` While creating ${key} success`);
        log.push(` While creating ${key} success`)
      }
    }
    return { message: log }

  }


}

