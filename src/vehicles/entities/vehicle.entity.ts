import { ApiProperty } from "@nestjs/swagger";
import { Films } from "src/films/entities/film.entity";
import { People } from "src/people/entities/people.entity";
import { Photo } from "src/photo/entities/photo.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Vehicle id', nullable: true })
  vehicle_id: string;

  @Column()
  @ApiProperty({ description: 'The name of the vehicle', nullable: true })
  name: string;

  @Column()
  @ApiProperty({ description: 'The model or official name of the vehicle', nullable: true })
  model: string;

  @Column()
  @ApiProperty({ description: 'The class of the vehicle', nullable: true })
  vehicle_class: string;

  @Column()
  @ApiProperty({ description: 'The manufacturer(s) of the vehicle, separated by commas if there are multiple', nullable: true })
  manufacturer: string;

  @Column()
  @ApiProperty({ description: 'The length of the vehicle in meters', nullable: true })
  length: string;

  @Column()
  @ApiProperty({ description: 'The cost of the vehicle in galactic credits', nullable: true })
  cost_in_credits: string;

  @Column()
  @ApiProperty({ description: 'The number of personnel required to operate or pilot the vehicle', nullable: true })
  crew: string;

  @Column()
  @ApiProperty({ description: 'The number of optional passengers the vehicle can carry', nullable: true })
  passengers: string;

  @Column()
  @ApiProperty({ description: 'The maximum atmospheric speed of the vehicle. "N/A" if the vehicle is incapable of atmospheric flight', nullable: true })
  max_atmosphering_speed: string;

  @Column()
  @ApiProperty({ description: 'The maximum cargo capacity of the vehicle in kilograms', nullable: true })
  cargo_capacity: string;

  @Column()
  @ApiProperty({ description: 'The maximum period of consumables supply for the vehicle', nullable: true })
  consumables: string;

  @OneToMany(() => Photo, (photo) => photo.vehicles)
  @ApiProperty({ description: 'An array of Photos that are in this vehicles', nullable: true })
  photos: Photo[]

  @ManyToMany((type) => Films, (films) => films.vehicles)
  @ApiProperty({ description: 'An array of Film that this vehicle has appeared in.', nullable: true })
  films: Films[];

  @ManyToMany((type) => People, (people) => people.vehicles)
  @ApiProperty({ description: 'An array of People that this vehicle has been piloted by.', nullable: true })
  pilots: People[];

  @Column()
  @ApiProperty({ description: 'The URL of this resource', nullable: true })
  url: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Record creation date', nullable: true })
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Record update date', nullable: true })
  updatedAt: string;

  @DeleteDateColumn()
  @ApiProperty({ description: 'for soft-delete Vehicle', nullable: true })
  deletedAt?: Date;

}

