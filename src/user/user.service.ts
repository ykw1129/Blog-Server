/*
https://docs.nestjs.com/providers#services
*/
import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: {
        articles: true,
      },
    });
  }
  async createUser(registerDto: RegisterDto): Promise<User | undefined> {
    const { email } = registerDto;
    const user = await this.findOneByEmail(email);
    const password = await this.encryptPassword(registerDto.password);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
    } else {
      const user = this.userRepository.create({
        ...registerDto,
        password,
      });
      return this.userRepository.save(user);
    }
  }
  async encryptPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
