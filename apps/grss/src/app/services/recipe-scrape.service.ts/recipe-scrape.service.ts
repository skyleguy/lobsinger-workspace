import { Injectable } from '@nestjs/common';
import axios from 'axios';
import soup from 'jssoup';
import { catchError, from, map, Observable, throwError } from 'rxjs';

import { Ingredient } from '@lob/shared/ingredients/data';

import { ScrapeResponse } from '../../models';

@Injectable()
export class RecipeScrapeService {
  readonly containerItems = ['div', 'ul', 'ol', 'li'];
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

  public scrapeRecipe(url: string): Observable<ScrapeResponse> {
    return from(
      axios.post(
        // 'https://www.hellmanns.com/us/en/recipes/vegan-chili-stuffed-baked-potatoes.html',
        // 'https://www.noracooks.com/vegan-teriyaki-noodle-bowls/',
        // 'https://www.loveandlemons.com/squash-stuffed-shells/',
        // 'https://sweetpotatosoul.com/watermelon-peach-salad-with-lime/',
        url,
        null,
        {
          responseType: 'text'
        }
      )
    ).pipe(
      map((data) => {
        const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        const response: ScrapeResponse = {
          ingredients: []
        };
        const theSoup = new soup(data.data);
        tags.forEach((tag) => {
          this.findItems(theSoup, tag, response.ingredients);
        });
        return response;
      }),
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  private pluckNodes(node, items) {
    if (node.name === 'li') {
      items.push(this.sanitizeText(node.text));
    }
    if (this.containerItems.includes(node.name) || node?.name?.[0] === 'h') {
      if (node?.nextSiblings?.length >= 1) {
        this.pluckNodes(node?.nextSiblings[0], items);
      }
      if (node?.contents?.length >= 1) {
        this.pluckNodes(node?.contents[0], items);
      }
    }
  }

  private findItems(soup, tag, items) {
    const headerTags = soup.findAll(tag);
    headerTags.forEach((header) => {
      if (header.text.toLowerCase().includes('ingredients')) {
        if (header?.nextSiblings?.length >= 1) {
          this.pluckNodes(header?.nextSiblings[0], items);
        }
      }
    });
  }

  private sanitizeText(input: string): Ingredient {
    input = input.replace(/&#32;/g, ' ');
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
