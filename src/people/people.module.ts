import { Global, Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Films } from 'src/films/entities/film.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { Photo } from 'src/photo/entities/photo.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([People, Planet, Films, Species, Vehicles, Starships, Photo]),
  ],
  providers: [
    PeopleService,
  ],
  controllers: [PeopleController],
  exports: [PeopleService],
})
export class PeopleModule { }
