import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const hash = await argon.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          hashedPassword: hash,
        },
      });

      delete user.hashedPassword;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials not valid');
    }

    const pswMatches = await argon.verify(user.hashedPassword, dto.password);

    if (!pswMatches) {
      throw new ForbiddenException('Credentials not valid');
    }

    delete user.hashedPassword;
    return user;
  }
}
