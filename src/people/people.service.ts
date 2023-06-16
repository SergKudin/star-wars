import { Injectable } from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/upate-people.dto';

@Injectable()
export class PeopleService {

  private people = []

  getAll() {
    return this.people
  }

  getAllWithPagination(page: number, limit: number) {
    // limit - elements by page
    const indexStart = (page - 1) * limit
    console.log("page = " + page + " limit = " + limit)
    console.log(JSON.stringify(this.people.slice(indexStart, indexStart + limit)))
    return this.people.slice(indexStart, indexStart + limit)
  }

  getById(id: number) {
    return this.people.find(p => p._id === id)
  }

  create(peopleDto: CreatePeopleDto) {
    const p = {
      ...peopleDto,
      _id: Date.now()
    }
    this.people.push(p)
    return p
  }

  update(id: number, peopleDto: UpdatePeopleDto) {
    const index = this.people.findIndex(p => p.id === id)
    if (index === -1) {
      return
    }
    this.people[index] = peopleDto
    return this.people[index]
  }

  remove(id: number) {
    this.people = this.people.filter(p => p.id != id)
  }

}
