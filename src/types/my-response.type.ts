import { ApiProperty } from '@nestjs/swagger';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { SwapiResponse } from './swapi-response.type';

export class MyResponse<T extends People | Planet | Films | Species | Vehicles | Starships | Photo | SwapiResponse<People> | SwapiResponse<Planet> | SwapiResponse<Films> | SwapiResponse<Species> | SwapiResponse<Vehicles> | SwapiResponse<Starships> | SwapiResponse<Photo>> {
  @ApiProperty({ description: 'If applicable, Data containing either the specified type T or a SwapiResponse<T> object, T extends People | Planet | Films | Species | Vehicles | Starships | Photo' })
  data?: T | SwapiResponse<T>;

  @ApiProperty({ description: 'Error message, if applicable' })
  error?: string;

  @ApiProperty({ description: 'Array of messages, if applicable' })
  message?: string[];
}
