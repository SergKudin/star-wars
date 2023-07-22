import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateIf, IsEmpty } from "class-validator";

export class CreatePhotoDto {

  @ApiPropertyOptional({ description: 'Description for the image', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'ID of the Film associated with this image', nullable: true })
  @IsString()
  @IsOptional()
  film?: string

  @ApiPropertyOptional({ description: 'ID of the people associated with this image', nullable: true })
  @IsString()
  @IsOptional()
  people?: string

  @ApiPropertyOptional({ description: 'ID of the planet associated with this image', nullable: true })
  @IsString()
  @IsOptional()
  planet?: string

  @ApiPropertyOptional({ description: 'ID of the species associated with this image', nullable: true })
  @IsString()
  @IsOptional()
  species?: string

  @ApiPropertyOptional({ description: 'ID of the starship associated with this image', nullable: true })
  @IsString()
  @IsOptional()
  starships?: string

  @ApiPropertyOptional({ description: 'ID of the vehicle associated with this image', nullable: true })
  @IsString()
  @IsOptional()
  vehicles?: string
}
