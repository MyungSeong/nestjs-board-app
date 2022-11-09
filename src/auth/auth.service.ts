import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';

import { UserRepository } from '../users/users.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    async signUp(authcredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.createUser(authcredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<object> {
        const { username, password } = authCredentialsDTO;

        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const compare = await bcrypt.compareSync(password, user.password);

        if (compare) {
            return {
                statusCode: 200,
                message: 'Login successful',
            };
        } else {
            throw new UnauthorizedException('Password mismatch');
        }
    }
}
