import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async getBoardById(id: number): Promise<Board> {
        // const found = await this.boardRepository.findOne({ where: { id } });
        const found = await this.boardRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Cannot find board with id ${id}`);
        }

        return found;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        this.boardRepository.save(board);

        return board;
    }

    async deleteBoard(id: number): Promise<object> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Cannot find board with id ${id}`);
        }

        return result;
    }
}
