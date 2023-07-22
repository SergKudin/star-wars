import { ApiProperty } from "@nestjs/swagger";
import { Films } from "src/films/entities/film.entity";
import { People } from "src/people/entities/people.entity";
import { Photo } from "src/photo/entities/photo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Starships {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Starship id', nullable: true })
  starship_id: string;

  @Column()
  @ApiProperty({ description: 'The name of the starship', nullable: true })
  name: string;

  @Column()
  @ApiProperty({ description: 'The model or official name of the starship', nullable: true })
  model: string;

  @Column()
  @ApiProperty({ description: 'The class of the starship', nullable: true })
  starship_class: string;

  @Column()
  @ApiProperty({ description: 'The manufacturer(s) of the starship, separated by commas if there are multiple', nullable: true })
  manufacturer: string;

  @Column()
  @ApiProperty({ description: 'The cost of the starship in galactic credits', nullable: true })
  cost_in_credits: string;

  @Column()
  @ApiProperty({ description: 'The length of the starship in meters', nullable: true })
  length: string;

  @Column()
  @ApiProperty({ description: 'The number of personnel required to operate or pilot the starship', nullable: true })
  crew: string;

  @Column()
  @ApiProperty({ description: 'The number of optional passengers the starship can carry', nullable: true })
  passengers: string;

  @Column()
  @ApiProperty({ description: 'The maximum atmospheric speed of the starship. "N/A" if the starship is incapable of atmospheric flight', nullable: true })
  max_atmosphering_speed: string;

  @Column()
  @ApiProperty({ description: 'The hyperdrive rating class of the starship', nullable: true })
  hyperdrive_rating: string;

  @Column()
  @ApiProperty({ description: 'The maximum number of Megalight units that the starship can travel in a standard hour', nullable: true })
  MGLT: string;

  @Column()
  @ApiProperty({ description: 'The maximum cargo capacity of the starship in kilograms', nullable: true })
  cargo_capacity: string;

  @Column()
  @ApiProperty({ description: 'The maximum period of consumables supply for the starship without needing to resupply', nullable: true })
  consumables: string;

  @OneToMany(() => Photo, (photo) => photo.starships)
  @ApiProperty({ description: 'An array of Photos that are in this starships', nullable: true })
  photos: Photo[]

  @ManyToMany((type) => Films, (film) => film.starships)
  @ApiProperty({ description: 'An array of Film that this starship has appeared in', nullable: true })
  films: Films[];

  @ManyToMany((type) => People, (people) => people.starships)
  @ApiProperty({ description: 'An array of People that this starship has been piloted by', nullable: true })
  pilots: People[];

  @Column()
  @ApiProperty({ description: 'The URL of this resource', nullable: true })
  url: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Record creation date', nullable: true })
  created: string;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Record update date', nullable: true })
  edited: string;
}

