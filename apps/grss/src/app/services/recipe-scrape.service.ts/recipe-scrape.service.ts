import { Injectable, Logger } from '@nestjs/common';
import { gotScraping } from 'got-scraping';
import soup from 'jssoup';
import sharp from 'sharp';

import { Ingredient, ScrapeResponse } from '@lob/shared/ingredients/data';

@Injectable()
export class RecipeScrapeService {
  readonly logger = new Logger(RecipeScrapeService.name);
  readonly containerItems = ['div', 'ul', 'ol', 'li'];
  readonly contentItems = ['li', 'p'];
  readonly directionsLabels = ['directions', 'instructions'];
  readonly ampersandEscapeSequence = '&#038;';
  readonly whitespaceCharacter = '&#32;';
  readonly units: string[] = [
    'cups',
    'cup',
    'tbsp',
    'tsp',
    'tbsps',
    'tsps',
    'dash',
    'pinch',
    'ounces',
    'ounce',
    'oz',
    'teaspoons',
    'teaspoon',
    'tablespoons',
    'tablespoon',
    'fluid ounces',
    'fluid ounce',
    'fl oz'
  ];
  readonly scrapeRegex: RegExp = new RegExp(`([\\d/\\.]*)\\s?(${this.units.join('|')})?\\s?([^\\d]*)`, '');
  readonly whitespaceRegex: RegExp = new RegExp(this.whitespaceCharacter, 'g');
  readonly headers = {};

  public async scrapeRecipe(url: string): Promise<ScrapeResponse> {
    let data;
    try {
      this.logger.log(`making call to: ${url}`);
      data = await gotScraping.get(url);
    } catch (err) {
      this.logger.log(`Recieved error when calling ${url}`, err);
      return Promise.reject(err);
    }
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const scrapeResponse: ScrapeResponse = {
      ingredients: [],
      directions: [],
      image: null,
      title: ''
    };
    const theSoup = new soup(data.body);
    tags.forEach((tag) => {
      this.findItems(theSoup, tag, scrapeResponse);
    });
    await this.searchForImage(theSoup, scrapeResponse, url);
    return scrapeResponse;
  }

  private findItems(soup, tag, scrapeResponse: ScrapeResponse) {
    const headerTags = soup.findAll(tag);
    headerTags.forEach((header) => {
      const headerText = header.text.toLowerCase();
      if (header?.nextSiblings?.length > 0) {
        // search for content in sibling element to h tag
        this.findSpecificHeaderTitles(header, headerText, scrapeResponse, tag);
      } else {
        // search for content after going up one level to the h tags parent and getting its first sibling to search in
        const headerText = header.text.toLowerCase();
        const newRootTag = header.parent;
        this.findSpecificHeaderTitles(newRootTag, headerText, scrapeResponse, tag);
      }
    });
  }

  private findSpecificHeaderTitles(node, headerText, scrapeResponse, tag) {
    if (node?.nextSiblings?.length > 0) {
      if (tag === 'h1' && node.attrs.class?.includes('title')) {
        scrapeResponse.title = headerText.replace(this.ampersandEscapeSequence, '&').trim();
      }
      if (headerText.includes('ingredients')) {
        if (node?.nextSiblings?.length >= 1) {
          this.traverseNodes(node?.nextSiblings[0], scrapeResponse.ingredients, (content) => this.convertContentToIngredient(content));
        }
      } else if (this.directionsLabels.some((label) => headerText.includes(label))) {
        if (node?.nextSiblings?.length >= 1) {
          this.traverseNodes(node?.nextSiblings[0], scrapeResponse.directions, null);
        }
      }
    }
  }

  private traverseNodes(node, items, sanitizeTextCallback) {
    if (this.contentItems.includes(node.name)) {
      if (sanitizeTextCallback) {
        items.push(sanitizeTextCallback(node.text));
      } else {
        items.push(node.text);
      }
    }
    if (this.containerItems.includes(node.name) || node?.name?.[0] === 'h') {
      if (node?.nextSiblings?.length >= 1) {
        this.traverseNodes(node?.nextSiblings[0], items, sanitizeTextCallback);
      }
      if (node?.contents?.length >= 1) {
        this.traverseNodes(node?.contents[0], items, sanitizeTextCallback);
      }
    }
  }

  private convertContentToIngredient(input: string): Ingredient {
    input = input.replace(this.whitespaceRegex, ' ');
    const [_whole, amount, unit, name] = input.match(this.scrapeRegex);
    if (amount?.length > 0 && unit?.length > 0 && name?.length > 0) {
      return { amount, unit, name };
    } else if (amount?.length > 0 && !unit && name?.length > 0) {
      return { amount, unit: '', name };
    } else if (!amount && unit?.length > 0 && name?.length > 0) {
      return { amount: '1', unit, name };
    } else {
      return { amount: '1', name: input, unit: '' };
    }
  }

  private async searchForImage(soup, scrapeResponse: ScrapeResponse, url: string) {
    const images: any[] = soup.findAll('img');
    const imageSrc = images.find((img) => {
      return img.attrs.src.includes('https');
    })?.attrs.src;
    if (imageSrc) {
      try {
        const imageRes = await gotScraping.get(imageSrc);
        await sharp(imageRes.rawBody)
          .resize({ width: 500, height: 300 })
          .toBuffer()
          .then((data) => {
            scrapeResponse.image = data;
          });
      } catch (e) {
        this.logger.error(`Image was not retrieved successfully: ${e}`);
      }
    } else {
      this.logger.warn(`No image with valid source found for ${url}`);
    }
  }
}
