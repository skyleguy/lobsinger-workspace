import { Body, Controller, Get } from '@nestjs/common';

import { ScrapeRequest } from '../../models';
import { RecipeScrapeService } from '../../services/recipe-scrape.service.ts/recipe-scrape.service';

@Controller()
export class RecipeScrapeController {
  constructor(private readonly recipeScrapeService: RecipeScrapeService) {}

  @Get()
  getData(@Body() request: ScrapeRequest) {
    return this.recipeScrapeService.scrapeRecipe(request.url);
  }
}
