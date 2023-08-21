import { Global, Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { MulterModule } from '@nestjs/platform-express';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([People, Planet, Films, Species, Vehicles, Starships, Photo]),
    // MulterModule.register({
    //   dest: 'uploads/', // Path to save downloaded files
    // }),
    S3Module,
  ],
  controllers: [PhotoController],
  providers: [PhotoService, S3Service],
  exports: [PhotoService],
})

export class PhotoModule { }
