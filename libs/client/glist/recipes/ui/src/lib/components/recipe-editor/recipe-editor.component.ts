import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

import { Recipe, Tag } from '@lob/client/glist/recipes/data';

@Component({
  selector: 'glist-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit {
  readonly next = 'NEXT';
  readonly back = 'BACK';
  readonly cancel = 'CANCEL';
  readonly dishTypes = ['Appetizer', 'Breakfast', 'Dessert', 'Lunch', 'Salad', 'Side Dish', 'Snack', 'Soup'];
  readonly cuisineTypes = [
    'American',
    'Chinese',
    'French',
    'Indian',
    'Italian',
    'Japanese',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Spanish',
    'Vietnamese'
  ];
  readonly dietTypes = [
    'Dairy-Free',
    'Egg-Free',
    'Gluten-Free',
    'Keto',
    'Nut-Free',
    'Oil-Free',
    'Paleo',
    'Pescatarian',
    'Soy-Free',
    'Vegan',
    'Vegetarian'
  ];

  generalInfoForm!: FormGroup;
  ingredientsForm!: FormGroup;
  directionsForm!: FormGroup;
  tagsForm!: FormGroup;

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

  get image() {
    return this.generalInfoForm.get('image');
  }

  get ingredients() {
    return this.ingredientsForm.get('ingredients');
  }

  get directions() {
    return this.directionsForm.get('directions') as FormArray;
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
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.createGeneralInfoForm();
    this.createIngredientsForm();
    this.createDirectionsForm();
    this.createTagsForm();
  }

  public addToFormArray(): void {
    this.directions?.push(new FormControl(''));
  }

  public base64Image(imgFile: any): void {
    if (imgFile.target.files && imgFile.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.generalInfoForm.get('image')?.setValue(e.target.result);
      };
      reader.readAsDataURL(imgFile.target.files[0]);
    }
  }

  public submitRecipe(): void {
    const r: Recipe = {
      title: this.name?.value,
      directions: this.directions.controls.map((control) => control.value),
      id: uuidv4(),
      ingredients: this.ingredients?.value,
      image: this.image?.value,
      isFavorited: false,
      servingSize: this.servingSize?.value,
      prepCookTime: this.prepCookTime?.value,
      toolsNeeded: this.toolsNeeded?.value,
      tags: [
        { type: 'Cusine', value: this.cuisineType?.value },
        { type: 'Diet', value: this.dietType?.value },
        { type: 'Dish', value: this.dishType?.value }
      ]
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
    console.log(r);
    this.dialogRef.close(r);
  }

  private createGeneralInfoForm(): void {
    this.generalInfoForm = this.fb.group({
      name: ['', Validators.required],
      servingSize: [null],
      prepCookTime: [null],
      toolsNeeded: [''],
      image: [null]
    });
  }

  private createIngredientsForm(): void {
    this.ingredientsForm = this.fb.group({
      ingredients: [
        [
          {
            name: null,
            amount: null
          }
        ],
        Validators.required
      ]
    });
  }

  private createDirectionsForm(): void {
    this.directionsForm = this.fb.group({
      directions: this.fb.array([''], Validators.required)
    });
  }

  private createTagsForm(): void {
    this.tagsForm = this.fb.group({
      dishType: [],
      cuisineType: [],
      dietType: [],
      otherTags: []
    });
  }
}
