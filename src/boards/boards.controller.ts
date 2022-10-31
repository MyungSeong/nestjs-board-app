import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getBoards(): Board[] {
        return this.boardsService.getBoards();
    }

    @Post()
    createBoard(@Body() createBoardDTO: CreateBoardDTO): Board {
        return this.boardsService.createBoard(createBoardDTO);
    }
}
