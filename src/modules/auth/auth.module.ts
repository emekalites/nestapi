import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { JWTHelper } from './jwt-helper';

@Module({
  imports: [TypeOrmModule.forFeature([User, PasswordReset])],
  controllers: [AuthController],
  providers: [AuthService, JWTHelper],
})
export class AuthModule {}
