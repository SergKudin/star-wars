import { MigrationInterface, QueryRunner } from "typeorm";

export class STARTMIGRATIONS1691685026781 implements MigrationInterface {
    name = 'STARTMIGRATIONS1691685026781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planet\` (\`planet_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`planet_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`species_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`planet_id\` int NULL, UNIQUE INDEX \`REL_1b943ab03ecbe4358f8d1df508\` (\`planet_id\`), PRIMARY KEY (\`species_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starships\` (\`starship_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`starship_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`vehicle_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`vehicle_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`photo_id\` int NOT NULL AUTO_INCREMENT, \`originalname\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`film_id\` int NULL, \`people_id\` int NULL, \`planet_id\` int NULL, \`species_id\` int NULL, \`starships_id\` int NULL, \`vehicles_id\` int NULL, PRIMARY KEY (\`photo_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`planet_id\` int NULL, PRIMARY KEY (\`_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`film_id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` varchar(1000) NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`film_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_films_films\` (\`people_id\` int NOT NULL, \`filmsFilmId\` int NOT NULL, INDEX \`IDX_0935fffb0f8fe841a01726f9ce\` (\`people_id\`), INDEX \`IDX_9c19eddfb07ed5211e9cb90ab4\` (\`filmsFilmId\`), PRIMARY KEY (\`people_id\`, \`filmsFilmId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_species_species\` (\`people_id\` int NOT NULL, \`speciesSpeciesId\` int NOT NULL, INDEX \`IDX_58d6f962505ee2be42eda1e286\` (\`people_id\`), INDEX \`IDX_c651ccd755f6cfc1830f1e3b3d\` (\`speciesSpeciesId\`), PRIMARY KEY (\`people_id\`, \`speciesSpeciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_starships_starships\` (\`people_id\` int NOT NULL, \`starshipsStarshipId\` int NOT NULL, INDEX \`IDX_bc41e25aadc8605953d14727ff\` (\`people_id\`), INDEX \`IDX_47397e8aff121463fce410d7d3\` (\`starshipsStarshipId\`), PRIMARY KEY (\`people_id\`, \`starshipsStarshipId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people_vehicles_vehicles\` (\`people_id\` int NOT NULL, \`vehiclesVehicleId\` int NOT NULL, INDEX \`IDX_0fac1bcca0d0a8ddf132f524cf\` (\`people_id\`), INDEX \`IDX_60588d7452640c153eb6bf2105\` (\`vehiclesVehicleId\`), PRIMARY KEY (\`people_id\`, \`vehiclesVehicleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_species_species\` (\`filmsFilmId\` int NOT NULL, \`speciesSpeciesId\` int NOT NULL, INDEX \`IDX_f3209ef2b23a2e7f18085f6a03\` (\`filmsFilmId\`), INDEX \`IDX_5a6be129ca0cfb1d876c3d399a\` (\`speciesSpeciesId\`), PRIMARY KEY (\`filmsFilmId\`, \`speciesSpeciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_starships_starships\` (\`filmsFilmId\` int NOT NULL, \`starshipsStarshipId\` int NOT NULL, INDEX \`IDX_3a2b9509f943c82d10d8734517\` (\`filmsFilmId\`), INDEX \`IDX_2d63f46833983e95c21ca889d1\` (\`starshipsStarshipId\`), PRIMARY KEY (\`filmsFilmId\`, \`starshipsStarshipId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_vehicles_vehicles\` (\`filmsFilmId\` int NOT NULL, \`vehiclesVehicleId\` int NOT NULL, INDEX \`IDX_47ea31ca980fa895d87c55aad8\` (\`filmsFilmId\`), INDEX \`IDX_f1f1e3ca4b73b1aa83565ad2f9\` (\`vehiclesVehicleId\`), PRIMARY KEY (\`filmsFilmId\`, \`vehiclesVehicleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films_planets_planet\` (\`filmsFilmId\` int NOT NULL, \`planetPlanetId\` int NOT NULL, INDEX \`IDX_51cc378c5884bb4a4546315c1a\` (\`filmsFilmId\`), INDEX \`IDX_a92a180a9f7c86b9814caa01a2\` (\`planetPlanetId\`), PRIMARY KEY (\`filmsFilmId\`, \`planetPlanetId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_1b943ab03ecbe4358f8d1df5081\` FOREIGN KEY (\`planet_id\`) REFERENCES \`planet\`(\`planet_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_6d81341cef593de629369f11e0a\` FOREIGN KEY (\`film_id\`) REFERENCES \`films\`(\`film_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_2fb564c1ef7ffa7a642558b3062\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_b8032707c5477bee7579c4f3fb0\` FOREIGN KEY (\`planet_id\`) REFERENCES \`planet\`(\`planet_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_031d178f22214b95f52bb8868a9\` FOREIGN KEY (\`species_id\`) REFERENCES \`species\`(\`species_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_be0979e3d5b4eafb109b5d37e95\` FOREIGN KEY (\`starships_id\`) REFERENCES \`starships\`(\`starship_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_903c02657a5ecc86cf4afe23442\` FOREIGN KEY (\`vehicles_id\`) REFERENCES \`vehicles\`(\`vehicle_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_c8330179efd8e4383018246be54\` FOREIGN KEY (\`planet_id\`) REFERENCES \`planet\`(\`planet_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_0935fffb0f8fe841a01726f9cea\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` ADD CONSTRAINT \`FK_9c19eddfb07ed5211e9cb90ab4e\` FOREIGN KEY (\`filmsFilmId\`) REFERENCES \`films\`(\`film_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` ADD CONSTRAINT \`FK_58d6f962505ee2be42eda1e2861\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` ADD CONSTRAINT \`FK_c651ccd755f6cfc1830f1e3b3d3\` FOREIGN KEY (\`speciesSpeciesId\`) REFERENCES \`species\`(\`species_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` ADD CONSTRAINT \`FK_bc41e25aadc8605953d14727ffa\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` ADD CONSTRAINT \`FK_47397e8aff121463fce410d7d30\` FOREIGN KEY (\`starshipsStarshipId\`) REFERENCES \`starships\`(\`starship_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` ADD CONSTRAINT \`FK_0fac1bcca0d0a8ddf132f524cf7\` FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` ADD CONSTRAINT \`FK_60588d7452640c153eb6bf21054\` FOREIGN KEY (\`vehiclesVehicleId\`) REFERENCES \`vehicles\`(\`vehicle_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_f3209ef2b23a2e7f18085f6a03b\` FOREIGN KEY (\`filmsFilmId\`) REFERENCES \`films\`(\`film_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` ADD CONSTRAINT \`FK_5a6be129ca0cfb1d876c3d399ab\` FOREIGN KEY (\`speciesSpeciesId\`) REFERENCES \`species\`(\`species_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_3a2b9509f943c82d10d87345178\` FOREIGN KEY (\`filmsFilmId\`) REFERENCES \`films\`(\`film_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` ADD CONSTRAINT \`FK_2d63f46833983e95c21ca889d1a\` FOREIGN KEY (\`starshipsStarshipId\`) REFERENCES \`starships\`(\`starship_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_47ea31ca980fa895d87c55aad83\` FOREIGN KEY (\`filmsFilmId\`) REFERENCES \`films\`(\`film_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` ADD CONSTRAINT \`FK_f1f1e3ca4b73b1aa83565ad2f9a\` FOREIGN KEY (\`vehiclesVehicleId\`) REFERENCES \`vehicles\`(\`vehicle_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planet\` ADD CONSTRAINT \`FK_51cc378c5884bb4a4546315c1a2\` FOREIGN KEY (\`filmsFilmId\`) REFERENCES \`films\`(\`film_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`films_planets_planet\` ADD CONSTRAINT \`FK_a92a180a9f7c86b9814caa01a22\` FOREIGN KEY (\`planetPlanetId\`) REFERENCES \`planet\`(\`planet_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`films_planets_planet\` DROP FOREIGN KEY \`FK_a92a180a9f7c86b9814caa01a22\``);
        await queryRunner.query(`ALTER TABLE \`films_planets_planet\` DROP FOREIGN KEY \`FK_51cc378c5884bb4a4546315c1a2\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_f1f1e3ca4b73b1aa83565ad2f9a\``);
        await queryRunner.query(`ALTER TABLE \`films_vehicles_vehicles\` DROP FOREIGN KEY \`FK_47ea31ca980fa895d87c55aad83\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_2d63f46833983e95c21ca889d1a\``);
        await queryRunner.query(`ALTER TABLE \`films_starships_starships\` DROP FOREIGN KEY \`FK_3a2b9509f943c82d10d87345178\``);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_5a6be129ca0cfb1d876c3d399ab\``);
        await queryRunner.query(`ALTER TABLE \`films_species_species\` DROP FOREIGN KEY \`FK_f3209ef2b23a2e7f18085f6a03b\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` DROP FOREIGN KEY \`FK_60588d7452640c153eb6bf21054\``);
        await queryRunner.query(`ALTER TABLE \`people_vehicles_vehicles\` DROP FOREIGN KEY \`FK_0fac1bcca0d0a8ddf132f524cf7\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` DROP FOREIGN KEY \`FK_47397e8aff121463fce410d7d30\``);
        await queryRunner.query(`ALTER TABLE \`people_starships_starships\` DROP FOREIGN KEY \`FK_bc41e25aadc8605953d14727ffa\``);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` DROP FOREIGN KEY \`FK_c651ccd755f6cfc1830f1e3b3d3\``);
        await queryRunner.query(`ALTER TABLE \`people_species_species\` DROP FOREIGN KEY \`FK_58d6f962505ee2be42eda1e2861\``);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_9c19eddfb07ed5211e9cb90ab4e\``);
        await queryRunner.query(`ALTER TABLE \`people_films_films\` DROP FOREIGN KEY \`FK_0935fffb0f8fe841a01726f9cea\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_c8330179efd8e4383018246be54\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_903c02657a5ecc86cf4afe23442\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_be0979e3d5b4eafb109b5d37e95\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_031d178f22214b95f52bb8868a9\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_b8032707c5477bee7579c4f3fb0\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_2fb564c1ef7ffa7a642558b3062\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_6d81341cef593de629369f11e0a\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_1b943ab03ecbe4358f8d1df5081\``);
        await queryRunner.query(`DROP INDEX \`IDX_a92a180a9f7c86b9814caa01a2\` ON \`films_planets_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_51cc378c5884bb4a4546315c1a\` ON \`films_planets_planet\``);
        await queryRunner.query(`DROP TABLE \`films_planets_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_f1f1e3ca4b73b1aa83565ad2f9\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_47ea31ca980fa895d87c55aad8\` ON \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP TABLE \`films_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_2d63f46833983e95c21ca889d1\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a2b9509f943c82d10d8734517\` ON \`films_starships_starships\``);
        await queryRunner.query(`DROP TABLE \`films_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_5a6be129ca0cfb1d876c3d399a\` ON \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_f3209ef2b23a2e7f18085f6a03\` ON \`films_species_species\``);
        await queryRunner.query(`DROP TABLE \`films_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_60588d7452640c153eb6bf2105\` ON \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_0fac1bcca0d0a8ddf132f524cf\` ON \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP TABLE \`people_vehicles_vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_47397e8aff121463fce410d7d3\` ON \`people_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc41e25aadc8605953d14727ff\` ON \`people_starships_starships\``);
        await queryRunner.query(`DROP TABLE \`people_starships_starships\``);
        await queryRunner.query(`DROP INDEX \`IDX_c651ccd755f6cfc1830f1e3b3d\` ON \`people_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_58d6f962505ee2be42eda1e286\` ON \`people_species_species\``);
        await queryRunner.query(`DROP TABLE \`people_species_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_9c19eddfb07ed5211e9cb90ab4\` ON \`people_films_films\``);
        await queryRunner.query(`DROP INDEX \`IDX_0935fffb0f8fe841a01726f9ce\` ON \`people_films_films\``);
        await queryRunner.query(`DROP TABLE \`people_films_films\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
        await queryRunner.query(`DROP INDEX \`REL_1b943ab03ecbe4358f8d1df508\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP TABLE \`planet\``);
    }

}
