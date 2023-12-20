import { createConnection, getConnection } from 'typeorm';
import { Board } from '../../modules/board/entities/board.entity';
import { Figure } from '../../modules/figure/entities/figure.entity';
import { Level } from '../../modules/level/entities/level.entity';
import { User } from '../../modules/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { AppContext } from '../../app-context';

async function importLevelData() {
  const configService = AppContext.get<ConfigService>(ConfigService);

  const connection = await createConnection({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRES_PORT'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    database: configService.getOrThrow('POSTGRES_DB'),
    entities: [User, Level, Figure, Board],
    synchronize: true,
  });

  const levelRepository = connection.getRepository(Level);
  const boardRepository = connection.getRepository(Board);
  const figureRepository = connection.getRepository(Figure);

  // first level
  const level1 = new Level();
  level1.name = `EASY`;
  level1.tick = 1000;
  level1.time = 180;
  level1.points = 1500;

  const board = new Board();
  board.height = 16;
  board.width = 10;

  const savedBoard = await boardRepository.save(board);

  level1.board = savedBoard;

  const figures = [];
  for (let j = 1; j <= 4; j++) {
    const figure1 = new Figure(); // Replace with your Figure class initialization
    figure1.shape = getRandomShape();
    figure1.level = level1;
    figures.push(figure1);
  }

  const savedFigures = await figureRepository.save(figures);

  level1.figures = savedFigures;
  await levelRepository.save(level1);

  // second level
  const level2 = new Level();
  level2.name = `MID`;
  level2.tick = 700;
  level2.time = 180;
  level2.points = 1500;

  const board2 = new Board();
  board2.height = 20;
  board2.width = 10;

  const savedBoard2 = await boardRepository.save(board2);

  level2.board = savedBoard2;

  const figures2 = [];
  for (let j = 1; j <= 4; j++) {
    const figure = new Figure(); // Replace with your Figure class initialization
    figure.shape = getRandomShape();
    figure.level = level2;
    figures2.push(figure);
  }

  const savedFigures2 = await figureRepository.save(figures2);

  level2.figures = savedFigures2;
  await levelRepository.save(level2);

  // third level
  const level3 = new Level();
  level3.name = `DIFFICULT`;
  level3.tick = 500;
  level3.time = 180;
  level3.points = 1500;

  const board3 = new Board();
  board3.height = 22;
  board3.width = 10;

  const savedBoard3 = await boardRepository.save(board3);

  level3.board = savedBoard3;

  const figures3 = [];
  for (let j = 1; j <= 4; j++) {
    const figure = new Figure(); // Replace with your Figure class initialization
    figure.shape = getRandomShape();
    figure.level = level3;
    figures3.push(figure);
  }

  const savedFigures3 = await figureRepository.save(figures3);

  level3.figures = savedFigures3;
  await levelRepository.save(level3);

  await connection.close();
}

function getRandomShape() {
  const validShapes = [
    99, 111, 1127, 1095, 15, 108, 110, 102, 26214, 26150, 126, 231, 4471, 4439,
    12834, 57890,
  ];

  const randomIndex = Math.floor(Math.random() * validShapes.length);

  return validShapes[randomIndex];
}

importLevelData().catch((error) => console.log(error));