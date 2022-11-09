import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../users/entities/users.entity';
import { UserRepository } from '../../users/users.repository';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get<string>('SECRET_KEY'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any) {
        const { username } = payload;

        const user: User = await this.userRepository.findOne({
            where: { username },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
