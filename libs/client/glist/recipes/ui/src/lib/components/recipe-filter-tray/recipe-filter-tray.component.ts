import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { cloneDeep, isEqual } from 'lodash';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

import { cuisineTypes, dishTypes, dietTypes, RecipeFilter } from '@lob/client/glist/recipes/data';

@Component({
    selector: 'glist-recipe-filter-tray',
    templateUrl: './recipe-filter-tray.component.html',
    imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatOptionModule]
})
export class RecipeFilterTrayComponent implements OnInit {
  readonly cuisineTypes = cuisineTypes;
  readonly dishTypes = dishTypes;
  readonly dietTypes = dietTypes;

  @Output()
  selectedFilters = new EventEmitter<RecipeFilter>();

  lastFilterEmitted: RecipeFilter = new RecipeFilter();
  recipeFilter: RecipeFilter = new RecipeFilter();
  searchTerm$: Subject<string> = new Subject();

  public ngOnInit(): void {
    this.subscribeToLastFilterEmit();
    this.subscribeToSearchChanges();
  }

  public emitModifiedRecipeFilter(): void {
    if (!isEqual(this.recipeFilter, this.lastFilterEmitted)) {
      this.selectedFilters.emit(cloneDeep(this.recipeFilter));
    }
  }

  public onSearchInputChange(term: string): void {
    this.searchTerm$.next(term.trim());
  }

  private subscribeToLastFilterEmit(): void {
    this.selectedFilters.subscribe({
      next: (filter: RecipeFilter) => (this.lastFilterEmitted = cloneDeep(filter))
    });
  }

  private subscribeToSearchChanges(): void {
    this.searchTerm$.pipe(distinctUntilChanged(), debounceTime(400)).subscribe({
      next: (term) => {
        this.recipeFilter.keyword = term;
        this.selectedFilters.emit(cloneDeep(this.recipeFilter));
      }
    });
  }
}
