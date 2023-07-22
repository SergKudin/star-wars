import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { CreatePhotoDto } from "../dto/create-photo.dto";

@Injectable()
export class AtLeastOneExistsPipe implements PipeTransform {
  transform(value: CreatePhotoDto, metadata: ArgumentMetadata) {
    const { description, film, people, planet, species, starships, vehicles } = value;
    if (!(description || film || people || planet || species || starships || vehicles)) {
      throw new BadRequestException('At least one parameter should exist.');
    }
    return value;
  }
}