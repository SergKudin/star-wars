import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class CreatePlanetDto {
  @ApiProperty({ description: 'Planet id', nullable: true })
  @IsString()
  @IsOptional()
  planet_id?: string;

  @ApiProperty({ description: 'The name of the planet', nullable: true })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The diameter of the planet in kilometers', nullable: true })
  @IsString()
  diameter: string;

  @ApiProperty({ description: 'The number of standard hours it takes for the planet to complete one full rotation on its axis', nullable: true })
  @IsString()
  rotation_period: string;

  @ApiProperty({ description: 'The number of standard days it takes for the planet to complete one orbit around its star', nullable: true })
  @IsString()
  orbital_period: string;

  @ApiProperty({ description: 'The gravity value of the planet. "1" represents normal or standard gravity. "2" represents double gravity. "0.5" represents half or sub-standard gravity', nullable: true })
  @IsString()
  gravity: string;

  @ApiProperty({ description: 'The average population of sentient beings inhabiting the planet', nullable: true })
  @IsString()
  population: string;

  @ApiProperty({ description: 'The climate of the planet. If the climate is diverse, multiple climates are listed separated by commas', nullable: true })
  @IsString()
  climate: string;

  @ApiProperty({ description: 'The terrain of the planet. If the terrain is diverse, multiple terrains are listed separated by commas', nullable: true })
  @IsString()
  terrain: string;

  @ApiProperty({ description: 'The percentage of the planets surface covered in water or water bodies', nullable: true })
  @IsString()
  surface_water: string;

  @ApiProperty({ description: 'An array of People that live on this planet', nullable: true })
  @IsArray()
  @IsString({ each: true })
  residents: string[];

  @ApiProperty({ description: ' An array of Film  that this planet has appeared in.', nullable: true })
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
