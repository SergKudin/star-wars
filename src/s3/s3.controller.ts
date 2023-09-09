import { Response } from 'express';
import { Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PathExistsInterceptor } from 'src/interceptors/path-exists.interceptor';
import { Roles } from 'src/auth/decorators/roles.decorators';

@ApiTags('AWS S3')
@ApiBearerAuth('jwt')
@Controller('awsS3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) { }

  @Post('upload-file')
  @Roles('admin')
  @ApiOperation({ summary: "To test the image upload functionality on AWS. Only use file type: 'image/png'" })
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
  @UseInterceptors(PathExistsInterceptor, FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/png',
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
    await this.s3Service.upload(file.originalname, file.buffer)
  }


  @Get(':fileName')
  @Roles('admin')
  @ApiOperation({ summary: "To test the image upload functionality from AWS. Use only file type: 'image/png'" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const data = this.s3Service.load(fileName);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'image/png')
    data.pipe(res)
  }


}
