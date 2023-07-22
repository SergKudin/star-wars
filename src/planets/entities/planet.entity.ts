import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { People } from "src/people/entities/people.entity";
import { Films } from "src/films/entities/film.entity";
import { Photo } from "src/photo/entities/photo.entity";

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Planet id', nullable: true })
  planet_id: string;

  @Column()
  @ApiProperty({ description: 'The name of the planet', nullable: true })
  name: string;

  @Column()
  @ApiProperty({ description: 'The diameter of the planet in kilometers', nullable: true })
  diameter: string;

  @Column()
  @ApiProperty({ description: 'The number of standard hours it takes for the planet to complete one full rotation on its axis', nullable: true })
  rotation_period: string;

  @Column()
  @ApiProperty({ description: 'The number of standard days it takes for the planet to complete one orbit around its star', nullable: true })
  orbital_period: string;

  @Column()
  @ApiProperty({ description: 'The gravity value of the planet. "1" represents normal or standard gravity. "2" represents double gravity. "0.5" represents half or sub-standard gravity', nullable: true })
  gravity: string;

  @Column()
  @ApiProperty({ description: 'The average population of sentient beings inhabiting the planet', nullable: true })
  population: string;

  @Column()
  @ApiProperty({ description: 'The climate of the planet. If the climate is diverse, multiple climates are listed separated by commas', nullable: true })
  climate: string;

  @Column()
  @ApiProperty({ description: 'The terrain of the planet. If the terrain is diverse, multiple terrains are listed separated by commas', nullable: true })
  terrain: string;

  @Column()
  @ApiProperty({ description: 'The percentage of the planets surface covered in water or water bodies', nullable: true })
  surface_water: string;

  @OneToMany((type) => People, (resident) => resident.homeworld)
  @ApiProperty({ description: 'An array of People that live on this planet', nullable: true })
  residents: People[];

  @ManyToMany((type) => Films, (film) => film.planets)
  @ApiProperty({ description: ' An array of Film  that this planet has appeared in.', nullable: true })
  films: Films[];

  @OneToMany(() => Photo, (photo) => photo.planet)
  @ApiProperty({ description: 'An array of Photos that are in this planet', nullable: true })
  photos: Photo[]

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


