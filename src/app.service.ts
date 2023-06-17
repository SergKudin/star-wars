import { Injectable } from '@nestjs/common';
import * as SWApi from 'swapi-ts';
import _ from 'lodash';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World! Hello World!';
  // }

  getHello() {
    // console.log(JSON.stringify(SWapi.People.find()))
    return JSON.stringify(SWApi.People.find());
  }
}
