import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export interface FileData {
  filename: string;
  originalname: string;
  mimetype: string;
  path: string;
  size: number;
}
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @Column()
  fileName: string;

  @Column('simple-json')
  fileData: FileData;
}
