import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not, In } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { UpdatePhotoDto } from './dto/update-photo.dto';
import { SwapiResponse } from 'src/types/swapi-response.type';
import { Photo } from './entities/photo.entity';
import { Films } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starship.entity';
import { Vehicles } from 'src/vehicles/entities/vehicle.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
    @InjectRepository(Starships)
    private readonly starshipsRepository: Repository<Starships>,
    private readonly s3Service: S3Service,
  ) { }

  query = {
    select: {
      photo_id: true,
      originalname: true,
      description: true,
      size: true,
      created: true,
      edited: true,
      film: { film_id: true, title: true },
      species: { species_id: true, name: true },
      starships: { starship_id: true, name: true },
      vehicles: { vehicle_id: true, name: true },
      people: { _id: true, name: true },
      planet: { planet_id: true, name: true },
    },
    relations: {
      film: true,
      people: true,
      planet: true,
      species: true,
      starships: true,
      vehicles: true,
    },
  }

  async uploadFile(file: Express.Multer.File) {
    const { originalname, size, mimetype } = file

    const existPhoto = await this.photoRepository.findOne({ where: { originalname, size } })
    if (existPhoto)
      throw new BadRequestException(`This Image: ${originalname} already exists`)

    const { Key } = await this.s3Service.upload(`SW_${Date.now()}`, file.buffer)
    const image = await this.photoRepository.save({ originalname, path: Key, size, mimetype, description: '' })

    return image
  }

  async getAllWithPagination(route: string, page: number, pageLimit: number): Promise<SwapiResponse<Photo>> {
    // limit - elements by page
    const { countStr }: { countStr: string } = await this.photoRepository
      .createQueryBuilder('photo')
      .select('COUNT(photo_id) AS countStr')
      .getRawOne()
    const count: number = +countStr
    const indexStart: number = (page - 1) * pageLimit
    route = process.env.IP + route.split('/').slice(0, -1).join('/') + '/'
    const next: string = (page * pageLimit < count) ? route + (page + 1) : 'null'
    const previous: string = (page < 2) ? 'null' : route + (page - 1)
    const results = await this.photoRepository.find({
      select: this.query.select,
      relations: this.query.relations,
      skip: indexStart,
      take: pageLimit,
    })
    return { count, next, previous, results }
  }

  async findOne(id: number) {
    return await this.photoRepository.findOne({
      select: this.query.select,
      relations: this.query.relations,
      where: { photo_id: id + '' }
    })
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {

    let existingPhoto = await this.photoRepository.findOne({ where: { photo_id: id + '' } });
    if (!existingPhoto)
      throw new BadRequestException(`Bad request! Check You data: id ${id} not find`)

    const { description, film, people, planet, species, starships, vehicles } = updatePhotoDto
    existingPhoto.description = description

    const savedPhoto = await this.photoRepository.save(existingPhoto);

    if (people) savedPhoto.people = await this.peopleRepository.findOne({ where: { _id: people } });
    if (planet) savedPhoto.planet = await this.planetRepository.findOne({ where: { planet_id: planet } });
    if (film) savedPhoto.film = await this.filmsRepository.findOne({ where: { film_id: film } });
    if (species) savedPhoto.species = await this.speciesRepository.findOne({ where: { species_id: species } });
    if (starships) savedPhoto.starships = await this.starshipsRepository.findOne({ where: { starship_id: starships } });
    if (vehicles) savedPhoto.vehicles = await this.vehiclesRepository.findOne({ where: { vehicle_id: vehicles } });

    return this.photoRepository.save(savedPhoto);
  }

  async remove(id: number) {
    const existPeople = await this.photoRepository.findOne({ where: { photo_id: id + '' } })
    if (!existPeople)
      throw new BadRequestException(`Bad request! Check You data: id ${id} not find`)

    return await this.photoRepository
      .createQueryBuilder('photo')
      .softDelete()
      .where("photo_id = :id", { id: id })
      .execute()
  }

  async getListElements() {
    return await this.photoRepository.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
  }

  async restore(id: number) {
    return await this.photoRepository
      .createQueryBuilder('photo')
      .restore()
      .where("photo_id = :id", { id: id })
      .execute()
  }

  async getFilePath(id: string): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: { photo_id: id } });
    if (!photo) {
      throw new NotFoundException('Image not found');
    }
    return photo;
  }

  async removeAll() {
    console.log('removeAllPhoto !!!')

    return await this.photoRepository
      .createQueryBuilder('photo')
      .delete()
      .from(Photo)
      .execute();
  }

  // 1. checks for records in the "photo" table without actually existing files.
  // 2. checks for files in the 'uploads' folder without a corresponding entry in the "photo" table
  // 3. remove found errors
  async removeInvalidPhotos() {
    const photo: Photo[] = await this.photoRepository.find({ withDeleted: true });
    const photoPaths: string[] = photo.map(item => item.path);

    const files: string[] = fs.readdirSync('uploads', { withFileTypes: true })
      .filter(d => d.isFile())
      .map(d => path.join('uploads', d.name));

    const invalidFiles = files.filter(filePath => !photoPaths.includes(filePath));

    if (invalidFiles.length > 0)
      console.error(`checks for files in the "uploads" folder without a corresponding entry in the "photo" table
  ${invalidFiles}`)

    invalidFiles.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    const invalidPhotoIds = photoPaths.filter(photoPath => !files.includes(photoPath))

    if (invalidPhotoIds.length > 0)
      console.error(`checks for records in the "photo" table without actually existing files.
  ${invalidPhotoIds}`)

    await this.photoRepository.delete({ path: In(invalidPhotoIds) });
  }
}
