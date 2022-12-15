/*
https://docs.nestjs.com/providers#services
*/

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
    });
  }
  async createUser(registerDto: RegisterDto): Promise<User | undefined> {
    const { email } = registerDto;
    const user = await this.findOneByEmail(email);
    if (user) {
      throw new HttpException(`User already exists`, HttpStatus.NOT_FOUND);
    } else {
      const user = this.userRepository.create(registerDto);
      return this.userRepository.save(user);
    }
  }
}
