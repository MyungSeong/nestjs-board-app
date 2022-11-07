import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from '../utils/typeorm/typeorm-ex.module';
import { User } from '../users/entities/users.entity';
import { UserRepository } from '../users/users.repository';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([User, UserRepository])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
