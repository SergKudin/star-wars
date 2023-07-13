import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from './entities/starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starships])],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule { }
