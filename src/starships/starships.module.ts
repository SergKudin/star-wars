import { Global, Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from './entities/starship.entity';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([People, Planet, Films, Species, Vehicles, Starships,]),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
  exports: [StarshipsService],

})
export class StarshipsModule { }
