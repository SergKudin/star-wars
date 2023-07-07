import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateFilmDto } from 'src/films/dto/create-film.dto';
import { CreatePeopleDto } from 'src/people/dto/create-people.dto';
import { CreatePlanetDto } from 'src/planets/dto/create-planet.dto';
import { CreateSpeciesDto } from 'src/species/dto/create-species.dto';
import { CreateStarshipDto } from 'src/starships/dto/create-starship.dto';
import { SwapiResponse } from 'src/types/swapiResponse.type';
import { SwapiSummObj } from 'src/types/swapiSummObj.type';
import { CreateVehicleDto } from 'src/vehicles/dto/create-vehicle.dto';

@Injectable()
export class MigrationService {
  constructor(private readonly httpService: HttpService) { }

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
    const existingData = this.migrationData.get(objName) as T[];
    const newData = await this.getData(objName, existingData) as unknown as T[];
    this.migrationData.set(objName, newData);
    return this.migrationData.get(objName) as unknown as T[];
  }

  async getMigrationData(): Promise<{ [key: string]: SwapiSummObj[]; }> {
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
    let next: string = this.adrSwapi + obj;
    console.log(next)
    let { data } = await firstValueFrom(
      this.httpService.get<SwapiResponse<T>>(next)
    );
    next = data.next
    arr.push(...data.results)
    while (next !== null) {
      console.log(next)
      let { data } = await firstValueFrom(
        this.httpService.get<SwapiResponse<T>>(next)
      );
      next = data.next
      arr.push(...data.results)
    }
    return arr
  }

}

