import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Recipe } from '@lob/client/glist/recipes/data';

@Component({
  selector: 'glist-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit {
  generalInfoForm!: FormGroup;

  get name() {
    return this.generalInfoForm.get('name');
  }
  constructor(
    public dialogRef: MatDialogRef<RecipeEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.createGeneralInfoForm();
  }

  public generalInfoSubmit(): void {
    console.log('yo');
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
}
