import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';

import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            id: v1(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };

        this.boards.push(board);

        return board;
    }
}
