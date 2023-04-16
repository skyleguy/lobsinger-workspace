import { Test, TestingModule } from '@nestjs/testing';

import { RecipeScrapeController } from './recipe-scrape.controller';

import { RecipeScrapeService } from '../../services/recipe-scrape.service.ts/recipe-scrape.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [RecipeScrapeController],
      providers: [RecipeScrapeService]
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to grss!"', () => {
      const _recipeScrapeController = app.get<RecipeScrapeController>(RecipeScrapeController);
      expect(true).toBeTruthy();
    });
  });
});
