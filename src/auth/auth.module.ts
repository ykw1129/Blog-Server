import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './strategy/constants';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
