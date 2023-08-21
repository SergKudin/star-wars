import { CreateFilmDto } from "src/films/dto/create-film.dto"
import { CreatePeopleDto } from "src/people/dto/create-people.dto"
import { CreatePlanetDto } from "src/planets/dto/create-planet.dto"
import { CreateSpeciesDto } from "src/species/dto/create-species.dto"
import { CreateStarshipDto } from "src/starships/dto/create-starship.dto"
import { CreateVehicleDto } from "src/vehicles/dto/create-vehicle.dto"

export type SwapiSummObj = CreatePeopleDto | CreateFilmDto | CreatePlanetDto | CreateSpeciesDto | CreateStarshipDto | CreateVehicleDto