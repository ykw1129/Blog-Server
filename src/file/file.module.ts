/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FilesService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FilesService],
})
export class FileModule {}
