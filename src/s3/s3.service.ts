import { DeleteObjectCommand, DeleteObjectRequest, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import internal from 'stream';

@Injectable()
export class S3Service {
  constructor(
    private readonly configeService: ConfigService,
  ) { }

  s3: S3 = new S3({
    region: this.configeService.get('AWS_S3_REGION'),
    accessKeyId: this.configeService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configeService.get('AWS_SECRET_ACCESS_KEY'),
  })

  bucket: string = this.configeService.get('AWS_BUCKET_NAME')

  upload(fileName: string, file: Buffer): Promise<S3.ManagedUpload.SendData> {
    return this.s3.upload({
      Bucket: this.bucket,
      Key: fileName,
      Body: file
    })
      .promise()
  }

  load(fileName: string): internal.Readable {
    return this.s3.getObject({
      Bucket: this.bucket,
      Key: fileName
    })
      .createReadStream()
  }

}
