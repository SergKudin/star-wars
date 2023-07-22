import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Req, UseInterceptors, UploadedFile, ParseFilePipeBuilder, Res, HttpException, StreamableFile } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Photo } from './entities/photo.entity';
import { SwapiResponse } from 'src/types/swapiResponse.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { AtLeastOneExistsPipe } from './pipes/at-least-one-exists.pipe';
import { createReadStream } from 'fs';

@ApiTags('Photo')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  @Patch(':id')
  @ApiOperation({ summary: "Update a Photo" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: UpdatePhotoDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @ApiBody({
    description: 'Upload Relation',
    type: UpdatePhotoDto,
  })
  update(@Param('id') id: string, @Body(new AtLeastOneExistsPipe()) updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @Post('upload-file')
  @ApiOperation({ summary: "Upload Image" })
  @ApiBody({
    description: 'Upload Image file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: HttpStatus.CREATED, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/*',
        })
        .addMaxSizeValidator({
          maxSize: 10000000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.photoService.uploadFile(file);
  }

  @Get('list-removed')
  @ApiOperation({ summary: "returns a list of removed elements" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  listElements() {
    return this.photoService.getListElements();
  }

  @Get('page/:page')
  @ApiOperation({ summary: "Returns the specified page number with size PAGE_LIMIT" })
  @ApiParam({ name: "page", required: true, description: "Page number" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: SwapiResponse<Photo> })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  getAllWithPagination(@Req() request: Request, @Param('page') page: string): Promise<SwapiResponse<Photo>> {
    return this.photoService.getAllWithPagination(request.url, +page, +process.env.PAGE_LIMIT)
  }

  @Get(':id')
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }

  @Get(':id/file')
  @ApiOperation({ summary: "Returns a note with specified id" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  async getFile(@Param('id') id: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const { path, mimetype, originalname } = await this.photoService.getFilePath(id);
    const file = createReadStream(path);
    res.set({
      'Content-Type': mimetype,
      'Content-Disposition': `attachment; filename=${originalname}`,
    });
    return new StreamableFile(file);
  }

  @ApiOperation({ summary: "Restores records of photo with the specified ID" })
  @ApiParam({ name: "id", required: true, description: "Photo identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @Post('restore/:id')
  restoreSoftDelete(@Param('id') id: string) {
    return this.photoService.restore(+id)
  }

  @Delete('removeAll')
  @ApiOperation({ summary: "Deletes all image" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  removeAll() {
    return this.photoService.removeAll()
  }

  @Delete(':id')
  @ApiOperation({ summary: "Remove a image" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }


}
