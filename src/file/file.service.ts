import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { FileData } from './entities/file.entity';
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(file: {
    filePath: string;
    fileName: string;
    fileData: FileData;
  }): Promise<File> {
    return await this.fileRepository.save(file);
  }
}
