import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, Length } from "class-validator";

export class UpdateFilmDto {
  @ApiProperty({ description: 'Film id', nullable: true })
  @IsString()
  film_id: string;

  @ApiProperty({ description: 'The title of the film', nullable: true })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The episode number of the film', nullable: true })
  @IsString()
  episode_id: string;

  @ApiProperty({ description: 'The opening crawl text of the film', nullable: true })
  @IsString()
  opening_crawl: string;

  @ApiProperty({ description: 'The director of the film', nullable: true })
  @IsString()
  director: string;

  @ApiProperty({ description: 'The producer(s) of the film', nullable: true })
  @IsString()
  producer: string;

  @ApiProperty({ description: 'The release date of the film', nullable: true })
  @IsString()
  release_date: string;

  @ApiProperty({ description: 'An array of species that are in this film', nullable: true })
  @IsArray()
  @IsString({ each: true })
  species: string[];

  @ApiProperty({ description: 'An array of starship that are in this film.', nullable: true })
  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @ApiProperty({ description: 'An array of vehicle that are in this film', nullable: true })
  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @ApiProperty({ description: 'An array of people that are in this film', nullable: true })
  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @ApiProperty({ description: 'An array of planet that are in this film', nullable: true })
  @IsArray()
  @IsString({ each: true })
  planets: string[];

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
