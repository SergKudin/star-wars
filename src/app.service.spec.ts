import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";

describe('MyService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should return "Hello World"', () => {
    const result = service.getHello();
    expect(result).toBe('Hello World!');
  });
});
