import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { Recipe, Tag, cuisineTypes, dietTypes, dishTypes } from '@lob/client/glist/recipes/data';
import { RecipeScrapeService } from '@lob/client/glist/recipes/data-access';
import { arrayBufferToImageString } from '@lob/client/shared/images/util';
import { Ingredient } from '@lob/shared/ingredients/data';

@Component({
  selector: 'glist-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogClose,
    MatIconModule,
    MatCheckboxModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule
  ]
})
export class RecipeEditorComponent implements OnInit {
  readonly next = 'NEXT';
  readonly back = 'BACK';
  readonly cancel = 'CANCEL';
  readonly cuisineTypes = cuisineTypes;
  readonly dishTypes = dishTypes;
  readonly dietTypes = dietTypes;
  readonly recipeCreationDateFormat = 'MM/dd/yyyy';

  urlInfoForm!: FormGroup;
  generalInfoForm!: FormGroup;
  ingredientsForm!: FormGroup;
  directionsForm!: FormGroup;
  tagsForm!: FormGroup;
  isFromUrl = false;
  isFromForm = false;

  get url() {
    return this.urlInfoForm.get('url');
  }

  get name() {
    return this.generalInfoForm.get('name');
  }

  get servingSize() {
    return this.generalInfoForm.get('servingSize');
  }

  get prepCookTime() {
    return this.generalInfoForm.get('prepCookTime');
  }

  get toolsNeeded() {
    return this.generalInfoForm.get('toolsNeeded');
  }

  get recipeLink() {
    return this.generalInfoForm.get('recipeLink');
  }

  get image() {
    return this.generalInfoForm.get('image');
  }

  get ingredients() {
    return this.ingredientsForm.get('ingredients');
  }

  get directions() {
    return this.directionsForm.get('directions') as FormArray | null;
  }

  get dishType() {
    return this.tagsForm.get('dishType');
  }

  get dietType() {
    return this.tagsForm.get('dietType');
  }

  get cuisineType() {
    return this.tagsForm.get('cuisineType');
  }

  get otherTags() {
    return this.tagsForm.get('otherTags');
  }

  constructor(
    public dialogRef: MatDialogRef<RecipeEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe,
    private fb: FormBuilder,
    private readonly recipeScrapeService: RecipeScrapeService
  ) {
    if (recipe) {
      this.isFromForm = true;
    }
  }

  public ngOnInit(): void {
    this.createUrlInfoForm();
    this.createGeneralInfoForm();
    this.createIngredientsForm();
    this.createDirectionsForm();
    this.createTagsForm();
  }

  public addToFormArray(): void {
    this.directions?.push(new FormControl(''));
  }

  public base64Image(imgFile: EventTarget | null): void {
    if (imgFile) {
      const inputEventTarget = imgFile as HTMLInputElement;
      if (inputEventTarget.files && inputEventTarget.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.generalInfoForm.get('image')?.setValue(e.target?.result);
        };
        reader.readAsDataURL(inputEventTarget.files[0]);
      }
    }
  }

  public submitRecipeFromUrl(): void {
    this.recipeScrapeService.scrapeRecipe(this.url?.value).subscribe({
      next: (scrapeResponse) => {
        const imageString = `data:image/jpeg;base64,${arrayBufferToImageString(scrapeResponse?.image?.data)}`;
        const r: Recipe = {
          title: scrapeResponse.title,
          directions: scrapeResponse.directions,
          id: uuidv4(),
          ingredients: scrapeResponse.ingredients,
          link: this.url?.value,
          image: imageString,
          tags: [
            { type: 'Cuisine', value: this.cuisineType?.value },
            { type: 'Diet', value: this.dietType?.value },
            { type: 'Dish', value: this.dishType?.value }
          ],
          creationTime: format(new Date(), this.recipeCreationDateFormat)
        };
        const otherTags: Tag[] = this.otherTags?.value?.split(',').map((tag: string): Tag => {
          return {
            type: 'Other',
            value: tag.trim()
          };
        });
        if (otherTags) {
          r.tags?.push(...otherTags);
        }
        this.dialogRef.close(r);
      }
    });
  }

  public submitRecipe(): void {
    let directions: string[] = [];
    if (this.directions) {
      directions = this.directions.controls.map((controls) => controls.value);
    }
    const r: Recipe = {
      title: this.name?.value,
      directions,
      id: this.recipe?.id ?? uuidv4(),
      ingredients: this.ingredients?.value,
      link: this.recipeLink?.value,
      image: this.image?.value,
      isFavorited: false,
      servingSize: this.servingSize?.value,
      prepCookTime: this.prepCookTime?.value,
      toolsNeeded: this.toolsNeeded?.value.split(',').map((tool: string) => tool.trim()),
      // TODO something odd going on when editing tags, current recipe values not being set in dropdowns either
      tags: [
        { type: 'Cuisine', value: this.cuisineType?.value ?? '' },
        { type: 'Diet', value: this.dietType?.value ?? '' },
        { type: 'Dish', value: this.dishType?.value ?? '' }
      ],
      creationTime: format(new Date(), this.recipeCreationDateFormat)
    };
    const otherTags: Tag[] = this.otherTags?.value?.split(',').map((tag: string): Tag => {
      return {
        type: 'Other',
        value: tag.trim()
      };
    });
    if (otherTags) {
      r.tags?.push(...otherTags);
    }
    this.dialogRef.close(r);
  }

  private createUrlInfoForm(): void {
    this.urlInfoForm = this.fb.group({
      url: [
        '',
        [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[\\/\\w .-]*\\??[a-z=_&+%$.*!()\\"\']+')]
      ]
    });
  }

  private createGeneralInfoForm(): void {
    this.generalInfoForm = this.fb.group({
      name: [this.recipe?.title ?? '', Validators.required],
      servingSize: [this.recipe?.servingSize ?? null],
      prepCookTime: [this.recipe?.prepCookTime ?? null],
      toolsNeeded: [this.recipe?.toolsNeeded?.join(', ') ?? ''],
      recipeLink: [this.recipe?.link ?? ''],
      image: [this.recipe?.image ?? null]
    });
  }

  private createIngredientsForm(): void {
    let initialIngredients: Ingredient[];
    if (this.recipe) {
      initialIngredients = this.recipe.ingredients;
    } else {
      initialIngredients = [
        {
          name: '',
          amount: ''
        }
      ];
    }
    this.ingredientsForm = this.fb.group({
      ingredients: [initialIngredients, Validators.required]
    });
  }

  private createDirectionsForm(): void {
    let initialDirections: string[];
    if (this.recipe) {
      initialDirections = [...this.recipe.directions];
    } else {
      initialDirections = [''];
    }
    this.directionsForm = this.fb.group({
      directions: this.fb.array(initialDirections, Validators.required)
    });
  }

  private createTagsForm(): void {
    this.tagsForm = this.fb.group({
      dishType: [this.recipe?.tags?.find((tag) => tag.type === 'Dish')?.value],
      cuisineType: [this.recipe?.tags?.find((tag) => tag.type === 'Cuisine')?.value],
      dietType: [this.recipe?.tags?.find((tag) => tag.type === 'Diet')?.value],
      otherTags: [
        this.recipe?.tags
          ?.filter((res) => res.type === 'Other')
          ?.map((tag) => tag.value)
          .join(', ')
      ]
    });
  }
}
