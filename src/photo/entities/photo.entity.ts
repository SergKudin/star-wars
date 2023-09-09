import { ApiProperty } from "@nestjs/swagger";
import { Films } from "src/films/entities/film.entity";
import { People } from "src/people/entities/people.entity";
import { Planet } from "src/planets/entities/planet.entity";
import { Species } from "src/species/entities/species.entity";
import { Starships } from "src/starships/entities/starship.entity";
import { Vehicles } from "src/vehicles/entities/vehicle.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne, DeleteDateColumn } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Photo id', nullable: true })
  photo_id: string;

  @Column()
  @ApiProperty({ description: 'The name of the file with which it was loaded', nullable: true })
  originalname: string;

  @Column()
  @ApiProperty({ description: 'Description for the image', nullable: true })
  description?: string;

  @Column()
  @ApiProperty({ description: 'the folder where the image is saved', nullable: true })
  path: string;

  @Column()
  @ApiProperty({ description: 'the mimetype where the image is saved', nullable: true })
  mimetype: string;

  @Column()
  @ApiProperty({ description: 'image file size', nullable: true })
  size: number;

  @ManyToOne((type) => Films, (film) => film.photos, { cascade: true, })
  @JoinColumn({ name: 'film_id' })
  @ApiProperty({ description: 'An array of Photos that are in this film', nullable: true })
  film: Films

  @ManyToOne(() => People, (people) => people.photos)
  @JoinColumn({ name: 'people_id' })
  @ApiProperty({ description: 'An array of Photos that are in this person', nullable: true })
  people: People

  @ManyToOne(() => Planet, (planet) => planet.photos)
  @JoinColumn({ name: 'planet_id' })
  @ApiProperty({ description: 'An array of Photos that are in this Planet', nullable: true })
  planet: Planet

  @ManyToOne(() => Species, (species) => species.photos)
  @JoinColumn({ name: 'species_id' })
  @ApiProperty({ description: 'An array of Photos that are in this species', nullable: true })
  species: Species

  @ManyToOne(() => Starships, (starships) => starships.photos)
  @JoinColumn({ name: 'starships_id' })
  @ApiProperty({ description: 'An array of Photos that are in this starships', nullable: true })
  starships: Starships

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.photos)
  @JoinColumn({ name: 'vehicles_id' })
  @ApiProperty({ description: 'An array of Photos that are in this Vehicles', nullable: true })
  vehicles: Vehicles

  // @CreateDateColumn()
  // @ApiProperty({ description: 'Record creation date', nullable: true })
  // created: string;

  // @UpdateDateColumn()
  // @ApiProperty({ description: 'Record update date', nullable: true })
  // edited: string;

  @DeleteDateColumn()
  @ApiProperty({ description: 'for soft-delete Photos', nullable: true })
  deletedAt?: Date;
}
