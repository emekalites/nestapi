import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordReset } from './entities/password-reset.entity';
import * as bcrypt from 'bcryptjs';
import * as md5 from 'js-md5';
import { JWTHelper } from './jwt-helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private readonly jwtHelper: JWTHelper,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const valid: User = await this.userRepository
        .createQueryBuilder('u')
        .select('u.id', 'id')
        .addSelect('u.status', 'status')
        .addSelect('u.password', 'password')
        .where('u.email = :input', { input: email })
        .getRawOne();

      if (!valid) {
        throw new UnauthorizedException('user not found');
      }

      const isMatch = await bcrypt.compare(password, valid.password);
      if (!isMatch) {
        throw new UnauthorizedException('invalid username or password');
      }

      if (valid.status === 0) {
        throw new UnauthorizedException('your account is not active, contact support');
      }

      const user: User = await this.userRepository.findOneBy({ id: valid.id });

      const jwt = await this.jwtHelper.createToken({ sub: user.id, email: user.email });
      const data = { ...jwt, user };

      return { success: true, data };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(e.message || 'could not login user');
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(registerDto.password, salt);

      const userData = { ...registerDto, password };

      const user: User = await this.userRepository.save(userData);

      const jwt = await this.jwtHelper.createToken({ sub: user.id, email: user.email });
      const data = { ...jwt, user };

      return { success: true, data };
    } catch (e) {
      console.log(e.message);
      let message = e.message || 'could not register user';
      if (e.message.includes('Duplicate entry')) {
        const type = e.message.includes(registerDto.email) ? 'email' : '';
        message = `${type} already taken`;
      }
      throw new BadRequestException(message);
    }
  }

  async user(id: number) {
    try {
      const user: User = await this.userRepository.findOneBy({ id });

      const data = { user };

      return { success: true, data };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('user not logged in');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    try {
      const { email } = forgotPasswordDto;

      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException('email not found');
      }

      const token: string = md5.hex(Math.random().toString(2));
      const reset = await this.passwordResetRepository.findOneBy({ email });

      if (!reset) {
        await this.passwordResetRepository.save({ email, token });
      } else {
        reset.token = token;
        await reset.save();
      }

      return { success: true, token };
    } catch (e) {
      throw new BadRequestException(e.message || 'failed to send recover password link');
    }
  }

  async checkPasswordToken(token: string) {
    try {
      const reset = await this.passwordResetRepository.findOneBy({ token });
      if (!reset) {
        throw new BadRequestException('invalid token or token not found');
      }

      return { success: true, data: reset };
    } catch (e) {
      throw new BadRequestException('invalid token or token not found');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const { token, email, password, repeat_password } = resetPasswordDto;
      if (password !== repeat_password) {
        throw new BadRequestException('your passwords do not match');
      }

      const reset = await this.passwordResetRepository
        .createQueryBuilder('r')
        .select('r.*')
        .where('r.email = :email', { email })
        .andWhere('r.token = :token', { token })
        .getRawOne();
      if (!reset) {
        throw new BadRequestException('invalid token or token not found');
      }

      const salt = await bcrypt.genSalt(10);

      const user = await this.userRepository.findOneBy({ email: reset.email });
      user.password = await bcrypt.hash(repeat_password, salt);
      await user.save();

      await this.passwordResetRepository.delete(reset.id);

      const jwt = await this.jwtHelper.createToken({ sub: user.id, email: user.email });
      const data = { ...jwt, user };

      return { success: true, data };
    } catch (e) {
      throw new BadRequestException('could not save password');
    }
  }

  async logout() {
    try {
      return { success: true };
    } catch (e) {
      throw new UnauthorizedException('user not logged in');
    }
  }
}
