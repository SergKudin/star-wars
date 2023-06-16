import { ApiProperty } from "@nestjs/swagger"

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

export class People {
  @ApiProperty({ description: 'People id', nullable: true })
  _id?: number

  @ApiProperty({ description: descr.name, nullable: true })
  name: string

  @ApiProperty({ description: descr.height, nullable: true })
  height: number

  @ApiProperty({ description: descr.mass, nullable: true })
  mass: number

  @ApiProperty({ description: descr.hair_color, nullable: true })
  hair_color: string

  @ApiProperty({ description: descr.skin_color, nullable: true })
  skin_color: string

  @ApiProperty({ description: descr.eye_color, nullable: true })
  eye_color: string

  @ApiProperty({ description: descr.birth_year, nullable: true })
  birth_year: string

  @ApiProperty({ description: descr.gender, nullable: true })
  gender: string

  @ApiProperty({ description: descr.homeworld, nullable: true })
  homeworld: string

  @ApiProperty({ description: descr.films, nullable: true })
  films: string[]

  @ApiProperty({ description: descr.species, nullable: true })
  species: string[]

  @ApiProperty({ description: descr.vehicles, nullable: true })
  vehicles: string[]

  @ApiProperty({ description: descr.starships, nullable: true })
  starships: string[]

  @ApiProperty({ description: descr.created, nullable: true })
  created: string[]

  @ApiProperty({ description: descr.edited, nullable: true })
  edited: string[]

  @ApiProperty({ description: descr.url, nullable: true })
  url: string[]

  constructor(
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    films: string[],
    species: string[],
    vehicles: string[],
    starships: string[],
    created: string[],
    edited: string[],
    url: string[],
    _id?: number,
  ) {
    this.name = name
    this.height = height
    this.mass = mass
    this.hair_color = hair_color
    this.skin_color = skin_color
    this.eye_color = eye_color
    this.birth_year = birth_year
    this.gender = gender
    this.homeworld = homeworld
    this.films = films
    this.species = species
    this.vehicles = vehicles
    this.starships = starships
    this.created = created
    this.edited = edited
    this.url = url
    if (_id !== undefined) {
      this._id = _id
    }
  }
}

