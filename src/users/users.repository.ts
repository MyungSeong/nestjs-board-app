import { CustomRepository } from 'src/utils/typeorm/typeorm-ex.decorator';
import { QueryFailedError, Repository } from 'typeorm';

import { User } from './entities/users.entity';

import { AuthCredentialsDTO } from '../auth/dto/auth-credentials.dto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDTO;

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
