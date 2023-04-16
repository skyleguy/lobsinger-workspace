import { Injectable } from '@nestjs/common';
import got from 'got';
import soup from 'jssoup';
import { catchError, from, map, Observable, throwError } from 'rxjs';

import { Ingredient } from '@lob/shared/ingredients/data';

import { ScrapeResponse } from '../../models';

// https://www.purplecarrot.com/recipe/kimchi-grilled-cheese-sandwiches-with-charred-asparagus-carrot-fries?plan=chefs_choice
// https://www.noracooks.com/vegan-teriyaki-noodle-bowls/

@Injectable()
export class RecipeScrapeService {
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

  public scrapeRecipe(url: string): Observable<ScrapeResponse> {
    return from(got.get(url)).pipe(
      map((data) => {
        const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const scrapeResponse: ScrapeResponse = {
          ingredients: [],
          directions: [],
          title: ''
        };
        const theSoup = new soup(data.body);
        tags.forEach((tag) => {
          this.findItems(theSoup, tag, scrapeResponse);
        });
        return scrapeResponse;
      }),
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
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
        scrapeResponse.title = headerText.replace(this.ampersandEscapeSequence, '&');
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
}
