import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  files: Array<Express.Multer.File>;
}
