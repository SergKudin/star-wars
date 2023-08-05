import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { MigrationController } from './migration.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { Photo } from 'src/photo/entities/photo.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([People, Planet, Films, Species, Vehicles, Starships, Photo]),
  ],
  controllers: [MigrationController],
  providers: [
    MigrationService,
  ],
  exports: []
})
export class MigrationModule { }
