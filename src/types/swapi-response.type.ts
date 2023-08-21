

import { ApiProperty } from "@nestjs/swagger"

export class SwapiResponse<T> {

  @ApiProperty({ description: 'array size', nullable: false })
  count: number

  @ApiProperty({ description: 'next page of array', nullable: true })
  next: string

  @ApiProperty({ description: 'previous page of array', nullable: true })
  previous: string

  @ApiProperty({ description: 'results page array', nullable: false })
  results: T[]
}