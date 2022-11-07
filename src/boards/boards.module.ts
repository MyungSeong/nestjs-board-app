import { Module } from '@nestjs/common';

import { TypeOrmExModule } from 'src/utils/typeorm/typeorm-ex.module';

import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

import { Board } from './entities/boards.entity';
import { BoardRepository } from './boards.repository';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([Board, BoardRepository])],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule {}
