import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateSpeciesDto {
  @ApiProperty({ description: 'Species id', nullable: true })
  @IsString()
  @IsOptional()
  species_id?: string;

  @ApiProperty({ description: 'The name of the species', nullable: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The classification of the species, e.g. "mammal" or "reptile"', nullable: true })
  @IsString()
  classification: string;

  @ApiProperty({ description: 'The designation of the species, e.g. "sentient"', nullable: true })
  @IsString()
  designation: string;

  @ApiProperty({ description: 'The average height of the species in centimeters', nullable: true })
  @IsString()
  average_height: string;

  @ApiProperty({ description: 'The average lifespan of the species in years', nullable: true })
  @IsString()
  average_lifespan: string;

  @ApiProperty({ description: 'A string listing common eye colors of the species. If the species has no eyes or eye color is unknown, "unknown" will be specified', nullable: true })
  @IsString()
  eye_colors: string;

  @ApiProperty({ description: 'A string listing common hair colors of the species. If the species has no hair or hair color is unknown, "unknown" will be specified', nullable: true })
  @IsString()
  hair_colors: string;

  @ApiProperty({ description: 'A string listing common skin colors of the species. If the species has no skin or skin color is unknown, "unknown" will be specified', nullable: true })
  @IsString()
  skin_colors: string;

  @ApiProperty({ description: 'The language typically spoken by the species', nullable: true })
  @IsString()
  language: string;

  @ApiProperty({ description: 'The URL of the homeworld resource associated with the species', nullable: true })
  @IsString()
  homeworld: string;

  @ApiProperty({ description: 'An array of People that are a part of this species.', nullable: true })
  @IsArray()
  @IsString({ each: true })
  people: string[];

  @ApiProperty({ description: 'An array of Film that this species has appeared in.', nullable: true })
  @IsArray()
  @IsString({ each: true })
  films: string[];

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
