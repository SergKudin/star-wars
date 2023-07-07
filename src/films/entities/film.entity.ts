import { ApiProperty } from "@nestjs/swagger";
import { People } from "src/people/entities/people.entity";
import { Planet } from "src/planets/entities/planet.entity";
import { Species } from "src/species/entities/species.entity";
import { Starships } from "src/starships/entities/starship.entity";
import { Vehicles } from "src/vehicles/entities/vehicle.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Films {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Film id', nullable: true })
  film_id: number;

  @Column()
  @ApiProperty({ description: 'The title of the film', nullable: true })
  title: string;

  @Column()
  @ApiProperty({ description: 'The episode number of the film', nullable: true })
  episode_id: number;

  @Column()
  @ApiProperty({ description: 'The opening crawl text of the film', nullable: true })
  opening_crawl: string;

  @Column()
  @ApiProperty({ description: 'The director of the film', nullable: true })
  director: string;

  @Column()
  @ApiProperty({ description: 'The producer(s) of the film', nullable: true })
  producer: string;

  @Column()
  @ApiProperty({ description: 'The release date of the film', nullable: true })
  release_date: string;

  @ManyToMany(() => Species, (species) => species.films)
  @JoinTable()
  @ApiProperty({ description: 'An array of species that are in this film', nullable: true })
  species: Species[];

  @ManyToMany(() => Starships, (starships) => starships.films)
  @JoinTable()
  @ApiProperty({ description: 'An array of starship that are in this film.', nullable: true })
  starships: Starships[];

  @ManyToMany(() => Vehicles, (vehicles) => vehicles.films)
  @JoinTable()
  @ApiProperty({ description: 'An array of vehicle that are in this film', nullable: true })
  vehicles: Vehicles[];

  @ManyToMany(() => People, (people) => people.films)
  @JoinTable()
  @ApiProperty({ description: 'An array of people that are in this film', nullable: true })
  characters: People[];

  @ManyToMany(() => Planet, (planet) => planet.films)
  @JoinTable()
  @ApiProperty({ description: 'An array of planet that are in this film', nullable: true })
  planets: Planet[];

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

