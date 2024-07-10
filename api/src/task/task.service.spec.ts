import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from 'src/db/db.service';
import { TaskService } from './task.service';
import { BoxTaskDTO } from './task.dto';
import { HttpStatus, InternalServerErrorException, ForbiddenException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  let dbService: DbService;

  const mockDbService = {
    groupTask: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    task: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: DbService, useValue: mockDbService },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    dbService = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
