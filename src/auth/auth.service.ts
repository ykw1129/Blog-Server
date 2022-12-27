/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // private readonly
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { email: user.username, id: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
