import { Module } from '@nestjs/common';

import { TypeOrmExModule } from 'src/utils/typeorm/typeorm-ex.module';

import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

import { Board } from './entity/board.entity';
import { BoardRepository } from './repository/board.repository';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([Board, BoardRepository])],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule {}
