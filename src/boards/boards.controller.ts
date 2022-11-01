import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { Board } from './board.entity';
import { BoardsService } from './boards.service';

import { BoardStatus } from './constants/board-status.enum';

import { CreateBoardDTO } from './dto/create-board.dto';

import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
        return this.boardsService.createBoard(createBoardDTO);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: number): Promise<object> {
        return this.boardsService.deleteBoard(id);
    }
}
