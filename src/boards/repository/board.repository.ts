import { Repository } from 'typeorm';

import { CustomRepository } from 'src/utils/typeorm/typeorm-ex.decorator';
import { Board } from '../entity/Board/board.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
