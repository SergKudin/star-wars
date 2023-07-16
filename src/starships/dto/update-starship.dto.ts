import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class UpdateStarshipDto {
  @ApiProperty({ description: 'Starship id', nullable: true })
  @IsString()
  starship_id: string;

  @ApiProperty({ description: 'The name of the starship', nullable: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The model or official name of the starship', nullable: true })
  @IsString()
  model: string;

  @ApiProperty({ description: 'The class of the starship', nullable: true })
  @IsString()
  starship_class: string;

  @ApiProperty({ description: 'The manufacturer(s) of the starship, separated by commas if there are multiple', nullable: true })
  @IsString()
  manufacturer: string;

  @ApiProperty({ description: 'The cost of the starship in galactic credits', nullable: true })
  @IsString()
  cost_in_credits: string;

  @ApiProperty({ description: 'The length of the starship in meters', nullable: true })
  @IsString()
  length: string;

  @ApiProperty({ description: 'The number of personnel required to operate or pilot the starship', nullable: true })
  @IsString()
  crew: string;

  @ApiProperty({ description: 'The number of optional passengers the starship can carry', nullable: true })
  @IsString()
  passengers: string;

  @ApiProperty({ description: 'The maximum atmospheric speed of the starship. "N/A" if the starship is incapable of atmospheric flight', nullable: true })
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty({ description: 'The hyperdrive rating class of the starship', nullable: true })
  @IsString()
  hyperdrive_rating: string;

  @ApiProperty({ description: 'The maximum number of Megalight units that the starship can travel in a standard hour', nullable: true })
  @IsString()
  MGLT: string;

  @ApiProperty({ description: 'The maximum cargo capacity of the starship in kilograms', nullable: true })
  @IsString()
  cargo_capacity: string;

  @ApiProperty({ description: 'The maximum period of consumables supply for the starship without needing to resupply', nullable: true })
  @IsString()
  consumables: string;

  @ApiProperty({ description: 'An array of Film that this starship has appeared in', nullable: true })
  @IsArray()
  @IsString({ each: true })
  films: string[];

  @ApiProperty({ description: 'An array of People that this starship has been piloted by', nullable: true })
  @IsArray()
  @IsString({ each: true })
  pilots: string[];

  @ApiProperty({ description: 'The URL of this resource', nullable: true })
  @IsString()
  url: string;

  @ApiProperty({ description: 'Record creation date', nullable: true })
  @IsString()
  created: string;

  @ApiProperty({ description: 'Record update date', nullable: true })
  @IsString()
  edited: string;

}
