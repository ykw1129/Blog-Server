/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFilesDto } from './dto/upload-files.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from './file.service';

@ApiTags('文件管理')
@Controller('files')
export class FileController {
  constructor(private filesService: FilesService) {}
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() data: UploadFileDto,
    @UploadedFile()
    file: /*       new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100000 })],
      }), */
    Express.Multer.File,
  ) {
    console.log(data, file);
    return {
      message: '上传成功',
      data: {
        file: file.buffer.toString(),
      },
    };
  }

  @Post('uploads')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload multiple files',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './public/files',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {
          return callback(new Error('Only image files are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFiles(
    @Body() data: UploadFilesDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const filePromises = files.map(async (file) => {
      const fileData = {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        path: file.path,
        size: file.size,
      };
      const filePath = file.path.slice(7); // 上传文件的路径
      const fileName = file.originalname; // 上传文件的原始文件名
      return await this.filesService.create({ filePath, fileName, fileData });
    });
    const res = await Promise.all(filePromises);
    return {
      message: '上传成功',
      res,
    };
  }
}
