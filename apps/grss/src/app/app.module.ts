import { Module } from '@nestjs/common';

import { RecipeScrapeController } from './controllers/recipe-scrape/recipe-scrape.controller';
import { RecipeScrapeService } from './services/recipe-scrape.service.ts/recipe-scrape.service';

@Module({
  imports: [],
  controllers: [RecipeScrapeController],
  providers: [RecipeScrapeService]
})
export class AppModule {}
