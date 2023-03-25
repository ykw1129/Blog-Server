import { ApiTags } from '@nestjs/swagger';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';

@ApiTags('用户管理')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }
}
