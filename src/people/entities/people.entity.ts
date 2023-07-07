import { ApiProperty } from "@nestjs/swagger"
import { Films } from "src/films/entities/film.entity"
import { Planet } from "src/planets/entities/planet.entity"
import { Species } from "src/species/entities/species.entity"
import { Starships } from "src/starships/entities/starship.entity"
import { Vehicles } from "src/vehicles/entities/vehicle.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'People id', nullable: true })
  _id: number

  @Column()
  @ApiProperty({ description: 'The name of this person', nullable: true })
  name: string

  @Column()
  @ApiProperty({ description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin.The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.', nullable: true })
  birth_year: string

  @Column()
  @ApiProperty({ description: 'The eye color of this person.Will be unknown if not known or n / a if the person does not have an eye.', nullable: true })
  eye_color: string

  @Column()
  @ApiProperty({ description: 'The gender of this person.Either Male, Female or unknown, n / a if the person does not have a gender.', nullable: true })
  gender: string

  @Column()
  @ApiProperty({ description: 'The hair color of this person.Will be unknown if not known or n / a if the person does not have hair.', nullable: true })
  hair_color: string

  @Column()
  @ApiProperty({ description: 'The height of the person in centimeters.', nullable: true })
  height: number

  @Column()
  @ApiProperty({ description: 'The mass of the person in kilograms.', nullable: true })
  mass: number

  @Column()
  @ApiProperty({ description: 'The skin color of this person.', nullable: true })
  skin_color: string

  @ManyToOne(() => Planet, (planet) => planet.residents)
  @JoinColumn({ name: 'planet_id' })
  @ApiProperty({ description: 'A planet that this person was born on or inhabits.', nullable: true })
  homeworld: Planet

  @ManyToMany(() => Films, (film) => film.characters)
  @JoinTable()
  @ApiProperty({ description: ' An array of film that this person has been in.', nullable: true })
  films: Films[]

  @ManyToMany(() => Species, (species) => species.people)
  @JoinTable()
  @ApiProperty({ description: 'An array of species that this person belongs to.', nullable: true })
  species: Species[]

  @ManyToMany(() => Starships, (starships) => starships.pilots)
  @JoinTable()
  @ApiProperty({ description: 'An array of starship that this person has piloted.', nullable: true })
  starships: Starships[]

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.pilots)
  @JoinTable()
  @ApiProperty({ description: 'An array of vehicle that this person has piloted.', nullable: true })
  vehicles: Vehicles[]

  @Column() // @Column({nullable: true})
  @ApiProperty({ description: 'The URL of this resource', nullable: true })
  url: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Record creation date', nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Record update date', nullable: true })
  updatedAt: Date;

}

