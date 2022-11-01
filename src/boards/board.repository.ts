import { Repository } from 'typeorm';
import { v1 } from 'uuid';

import { CustomRepository } from 'src/utils/typeorm/typeorm-ex.decorator';

import { Board } from './board.entity';

import { BoardStatus } from './constants/board-status.enum';

import { CreateBoardDTO } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
        const { title, description } = createBoardDTO;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        });

        await this.save(board);

        return board;
    }
}
