import { Module } from '@nestjs/common';

import { HealthController } from './controllers/health/health.controller';
import { RecipeScrapeController } from './controllers/recipe-scrape/recipe-scrape.controller';
import { RecipeScrapeService } from './services/recipe-scrape.service.ts/recipe-scrape.service';

@Module({
  imports: [],
  controllers: [RecipeScrapeController, HealthController],
  providers: [RecipeScrapeService]
})
export class AppModule {
  constructor() {
    console.log('hello');
  }
}
