import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const hash = await argon.hash(password);

    // const user = await this.prisma.user.create({
    //   data: {
    //     email,
    //     hashedPassword: hash,
    //   },
    // });

    const user = await this.prisma.user.create({
      data: {
        email: 'teste@teste.com',
        hashedPassword: 'tdsadsadadsa',
      },
    });

    delete user.hashedPassword;

    return user;
  }

  async signin() {
    return await this.prisma.user.findMany();

    return { msg: 'I have signed in' };
  }
}
