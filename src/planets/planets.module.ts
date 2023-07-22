import { Global, Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([People, Planet, Films, Species, Vehicles, Starships,]),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService],
  exports: [PlanetsService],

})
export class PlanetsModule { }
