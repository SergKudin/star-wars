import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';

@Module({
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule {}
