import { CustomRepository } from 'src/utils/typeorm/typeorm-ex.decorator';
import { QueryFailedError, Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

import { User } from './entities/users.entity';

import { AuthCredentialsDTO } from '../auth/dto/auth-credentials.dto';
import {
    ConflictException,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const { username, password } = authCredentialsDTO;

        const user = this.create({
            username,
            password: hashSync(password, 10),
        });

        /* const user = new User();
        user.username = username;
        user.password = hashSync(password, 10); */

        try {
            await this.save(user);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                if (error.driverError.code === 'ER_DUP_ENTRY') {
                    throw new HttpException('Already existing user', 409);
                }

                throw new InternalServerErrorException(
                    error.driverError.sqlMessage,
                );
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
