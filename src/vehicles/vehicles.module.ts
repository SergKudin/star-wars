import { Global, Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicles } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([People, Planet, Films, Species, Vehicles, Starships,]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],

})
export class VehiclesModule { }
