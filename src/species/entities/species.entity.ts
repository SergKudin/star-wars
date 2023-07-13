import { ApiProperty } from "@nestjs/swagger";
import { Films } from "src/films/entities/film.entity";
import { People } from "src/people/entities/people.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Species id', nullable: true })
  species_id: number;

  @Column()
  @ApiProperty({ description: 'The name of the species', nullable: true })
  name: string;

  @Column()
  @ApiProperty({ description: 'The classification of the species, e.g. "mammal" or "reptile"', nullable: true })
  classification: string;

  @Column()
  @ApiProperty({ description: 'The designation of the species, e.g. "sentient"', nullable: true })
  designation: string;

  @Column()
  @ApiProperty({ description: 'The average height of the species in centimeters', nullable: true })
  average_height: string;

  @Column()
  @ApiProperty({ description: 'The average lifespan of the species in years', nullable: true })
  average_lifespan: string;

  @Column()
  @ApiProperty({ description: 'A string listing common eye colors of the species. If the species has no eyes or eye color is unknown, "unknown" will be specified', nullable: true })
  eye_colors: string;

  @Column()
  @ApiProperty({ description: 'A string listing common hair colors of the species. If the species has no hair or hair color is unknown, "unknown" will be specified', nullable: true })
  hair_colors: string;

  @Column()
  @ApiProperty({ description: 'A string listing common skin colors of the species. If the species has no skin or skin color is unknown, "unknown" will be specified', nullable: true })
  skin_colors: string;

  @Column()
  @ApiProperty({ description: 'The language typically spoken by the species', nullable: true })
  language: string;

  @Column()
  @ApiProperty({ description: 'The URL of the homeworld resource associated with the species', nullable: true })
  homeworld: string;

  @ManyToMany((type) => People, (people) => people.species)
  @JoinTable()
  @ApiProperty({ description: 'An array of People that are a part of this species.', nullable: true })
  people: People[];

  @ManyToMany((type) => Films, (film) => film.species)
  @JoinTable()
  @ApiProperty({ description: 'An array of Film that this species has appeared in.', nullable: true })
  films: Films[];

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

