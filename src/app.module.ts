import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { UserModule } from './user/user.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpeciesModule } from './species/species.module';
import { PlanetsModule } from './planets/planets.module';
import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        // autoLoadEntities: true,
        // insecureAuth: true,
        // debug: false,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    PeopleModule,
    UserModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule,
    MigrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
