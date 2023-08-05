import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import { CreatePeopleDto } from "./create-people.dto"


const descr = {
  name: 'The name of this person',
  birth_year: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin.The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.',
  eye_color: 'The eye color of this person.Will be unknown if not known or n / a if the person does not have an eye.',
  gender: 'The gender of this person.Either Male, Female or unknown, n / a if the person does not have a gender.',
  hair_color: 'The hair color of this person.Will be unknown if not known or n / a if the person does not have hair.',
  height: 'The height of the person in centimeters.',
  mass: 'The mass of the person in kilograms.',
  skin_color: 'The skin color of this person.',
  homeworld: 'The URL of a planet resource, a planet that this person was born on or inhabits.',
  films: 'An array of film resource URLs that this person has been in.',
  species: 'An array of species resource URLs that this person belongs to.',
  starships: 'An array of starship resource URLs that this person has piloted.',
  vehicles: 'An array of vehicle resource URLs that this person has piloted.',
  url: 'the hypermedia URL of this resource.',
  created: 'the ISO 8601 date format of the time that this resource was created.',
  edited: 'the ISO 8601 date format of the time that this resource was edited.',
}

export class UpdatePeopleDto extends CreatePeopleDto {
  @ApiProperty({ description: 'People id', nullable: true })
  @IsString()
  @IsOptional()
  _id: string

  @ApiProperty({ description: descr.name, nullable: true })
  @IsString()
  name: string

  @ApiProperty({ description: descr.height, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : 0), { toClassOnly: true })
  height: string

  @ApiProperty({ description: descr.mass, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : 0), { toClassOnly: true })
  mass: string

  @ApiProperty({ description: descr.hair_color, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  hair_color: string

  @ApiProperty({ description: descr.skin_color, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  skin_color: string

  @ApiProperty({ description: descr.eye_color, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  eye_color: string

  @ApiProperty({ description: descr.birth_year, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  birth_year: string

  @ApiProperty({ description: descr.gender, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  gender: string

  @ApiProperty({ description: descr.homeworld, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  homeworld: string

  @ApiProperty({ description: descr.films, nullable: true })
  @IsArray()
  @IsString({ each: true })
  films: string[]

  @ApiProperty({ description: descr.species, nullable: true })
  @IsArray()
  @IsString({ each: true })
  species: string[]

  @ApiProperty({ description: descr.vehicles, nullable: true })
  @IsArray()
  @IsString({ each: true })
  vehicles: string[]

  @ApiProperty({ description: descr.starships, nullable: true })
  @IsArray()
  @IsString({ each: true })
  starships: string[]

  @ApiProperty({ description: descr.created, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  created: string

  @ApiProperty({ description: descr.edited, nullable: true })
  @IsString()
  // @Transform((value) => (value ? value : ''), { toClassOnly: true })
  edited: string

  @ApiProperty({ description: descr.url, nullable: true })
  @IsString()
  url: string
}