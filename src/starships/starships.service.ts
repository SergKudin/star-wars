import { Injectable } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

@Injectable()
export class StarshipsService {
  create(createStarshipDto: CreateStarshipDto) {
    return 'This action adds a new starship';
  }

  findAll() {
    return `This action returns all starships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} starship`;
  }

  update(id: number, updateStarshipDto: UpdateStarshipDto) {
    return `This action updates a #${id} starship`;
  }

  remove(id: number) {
    return `This action removes a #${id} starship`;
  }
}
