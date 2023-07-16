import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray } from "class-validator";

export class CreateVehicleDto {
  @ApiProperty({ description: 'Vehicle id', nullable: true })
  @IsString()
  @IsOptional()
  vehicle_id?: string;

  @ApiProperty({ description: 'The name of the vehicle', nullable: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The model or official name of the vehicle', nullable: true })
  @IsString()
  model: string;

  @ApiProperty({ description: 'The class of the vehicle', nullable: true })
  @IsString()
  vehicle_class: string;

  @ApiProperty({ description: 'The manufacturer(s) of the vehicle, separated by commas if there are multiple', nullable: true })
  @IsString()
  manufacturer: string;

  @ApiProperty({ description: 'The length of the vehicle in meters', nullable: true })
  @IsString()
  length: string;

  @ApiProperty({ description: 'The cost of the vehicle in galactic credits', nullable: true })
  @IsString()
  cost_in_credits: string;

  @ApiProperty({ description: 'The number of personnel required to operate or pilot the vehicle', nullable: true })
  @IsString()
  crew: string;

  @ApiProperty({ description: 'The number of optional passengers the vehicle can carry', nullable: true })
  @IsString()
  passengers: string;

  @ApiProperty({ description: 'The maximum atmospheric speed of the vehicle. "N/A" if the vehicle is incapable of atmospheric flight', nullable: true })
  @IsString()
  max_atmosphering_speed: string;

  @ApiProperty({ description: 'The maximum cargo capacity of the vehicle in kilograms', nullable: true })
  @IsString()
  cargo_capacity: string;

  @ApiProperty({ description: 'The maximum period of consumables supply for the vehicle', nullable: true })
  @IsString()
  consumables: string;

  @ApiProperty({ description: 'An array of Film that this vehicle has appeared in.', nullable: true })
  @IsArray()
  @IsString({ each: true })
  films: string[];

  @ApiProperty({ description: 'An array of People that this vehicle has been piloted by.', nullable: true })
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
