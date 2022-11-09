import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from '../users/entities/users.entity';
import { UserRepository } from '../users/users.repository';

import { TypeOrmExModule } from '../utils/typeorm/typeorm-ex.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET_KEY'),
                signOptions: {
                    expiresIn: configService.get<string>(
                        'ACCESS_KEY_EXPIRES_IN',
                    ),
                },
            }),
        }),
        TypeOrmExModule.forCustomRepository([User, UserRepository]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
    exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
