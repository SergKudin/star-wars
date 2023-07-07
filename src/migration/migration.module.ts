import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { MigrationController } from './migration.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [MigrationController],
  providers: [MigrationService]
})
export class MigrationModule { }
