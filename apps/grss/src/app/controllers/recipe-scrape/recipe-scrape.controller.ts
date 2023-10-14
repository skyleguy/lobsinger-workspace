import { Body, Controller, Logger, Post } from '@nestjs/common';

import { ScrapeRequest } from '../../models';
import { RecipeScrapeService } from '../../services/recipe-scrape.service.ts/recipe-scrape.service';

@Controller('scrape')
export class RecipeScrapeController {
  readonly logger = new Logger(RecipeScrapeController.name);
  constructor(private readonly recipeScrapeService: RecipeScrapeService) {}

  @Post()
  getData(@Body() request: ScrapeRequest) {
    this.logger.log(request);
    return this.recipeScrapeService.scrapeRecipe(request.url);
  }
}
