import { Module } from '@nestjs/common';

import { TypeOrmExModule } from 'src/utils/typeorm/typeorm-ex.module';

import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

import { Board } from './entities/boards.entity';
import { BoardRepository } from './boards.repository';

import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([Board, BoardRepository]),
        AuthModule,
    ],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule {}
