import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

import { BoardStatus } from './constants/board-status.enum';

import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private readonly boardRepository: BoardRepository,
    ) {}

    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDTO);
    }

    async getBoardById(id: number): Promise<Board> {
        // const found = await this.boardRepository.findOne({ where: { id } });
        const found = await this.boardRepository.findOneBy({ id });

        if (!found) {
            throw new Error(`Cannot find board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id: number): Promise<object> {
        const result = await this.boardRepository.delete(id);

        return {
            message: result.affected ? 'Success' : 'Failure',
        };
    }
}
