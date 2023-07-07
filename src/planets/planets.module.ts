import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService]
})
export class PlanetsModule {}
