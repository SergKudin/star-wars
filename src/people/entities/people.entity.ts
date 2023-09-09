import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"
import { Films } from "src/films/entities/film.entity"
import { Photo } from "src/photo/entities/photo.entity"
import { Planet } from "src/planets/entities/planet.entity"
import { Species } from "src/species/entities/species.entity"
import { Starships } from "src/starships/entities/starship.entity"
import { Vehicles } from "src/vehicles/entities/vehicle.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'People id', nullable: true })
  @IsString()
  _id: string

  @Column()
  @ApiProperty({ description: 'The name of this person', nullable: true })
  @IsString()
  name: string

  @Column()
  @ApiProperty({ description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin.The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.', nullable: true })
  @IsString()
  birth_year: string

  @Column()
  @ApiProperty({ description: 'The eye color of this person.Will be unknown if not known or n / a if the person does not have an eye.', nullable: true })
  @IsString()
  eye_color: string

  @Column()
  @ApiProperty({ description: 'The gender of this person.Either Male, Female or unknown, n / a if the person does not have a gender.', nullable: true })
  @IsString()
  gender: string

  @Column()
  @ApiProperty({ description: 'The hair color of this person.Will be unknown if not known or n / a if the person does not have hair.', nullable: true })
  @IsString()
  hair_color: string

  @Column()
  @ApiProperty({ description: 'The height of the person in centimeters.', nullable: true })
  @IsString()
  height: string

  @Column()
  @ApiProperty({ description: 'The mass of the person in kilograms.', nullable: true })
  @IsString()
  mass: string

  @Column()
  @ApiProperty({ description: 'The skin color of this person.', nullable: true })
  @IsString()
  skin_color: string

  @OneToMany(() => Photo, (photo) => photo.people)
  @ApiProperty({ description: 'An array of Photos that are in this person', nullable: true })
  photos: Photo[]

  @ManyToOne((type) => Planet, (planet) => planet.residents, { cascade: true, })
  @JoinColumn({ name: 'planet_id' })
  @ApiProperty({ description: 'A planet that this person was born on or inhabits.', nullable: true })
  homeworld: Planet

  @ManyToMany((type) => Films, (film) => film.characters, { cascade: true, })
  @JoinTable()
  @ApiProperty({ description: ' An array of film that this person has been in.', nullable: true })
  @IsArray()
  films: Films[]

  @ManyToMany((type) => Species, (species) => species.people, { cascade: true, })
  @JoinTable()
  @ApiProperty({ description: 'An array of species that this person belongs to.', nullable: true })
  @IsArray()
  species: Species[]

  @ManyToMany((type) => Starships, (starships) => starships.pilots, { cascade: true, })
  @JoinTable()
  @ApiProperty({ description: 'An array of starship that this person has piloted.', nullable: true })
  @IsArray()
  starships: Starships[]

  @ManyToMany((type) => Vehicles, (vehicles) => vehicles.pilots, { cascade: true, })
  @JoinTable()
  @ApiProperty({ description: 'An array of vehicle that this person has piloted.', nullable: true })
  @IsArray()
  vehicles: Vehicles[]

  @Column()
  @ApiProperty({ description: 'The URL of this resource', nullable: true })
  @IsString()
  url: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Record creation date', nullable: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Record update date', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({ description: 'for soft-delete people', nullable: true })
  deletedAt?: Date;
}

