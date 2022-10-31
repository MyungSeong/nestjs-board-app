import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';

import { Board, BoardStatus } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDTO: CreateBoardDTO) {
        const { title, description } = createBoardDTO;

        const board: Board = {
            id: v1(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };

        this.boards.push(board);

        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id === id);
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);

        board.status = status;

        return board;
    }
}
