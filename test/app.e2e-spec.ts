import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const base_url = 'http://localhost:3333';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl(base_url);
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    describe('POST/auth/signup', () => {
      it('Should signup', () => {
        const dto: AuthDto = {
          email: 'test@test.com',
          password: '123456',
        };

        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('POST/auth/signin', () => {
      it.todo('adsdas');
    });
  });

  describe('User', () => {
    describe('GET/user/me', () => {
      it.todo('adsdas');
    });

    describe('PATCH/user/edit', () => {
      it.todo('adsdas');
    });
  });

  describe('Bookmark', () => {
    describe('POST/bookmark/create', () => {
      it.todo('adsdas');
    });

    describe('GET/bookmark', () => {
      it.todo('adsdas');
    });

    describe('GET/bookmark/get', () => {
      it.todo('adsdas');
    });

    describe('PATCH/bookmark/edit', () => {
      it.todo('adsdas');
    });

    describe('DELETE/bookmark/delete', () => {
      it.todo('adsdas');
    });
  });
});
