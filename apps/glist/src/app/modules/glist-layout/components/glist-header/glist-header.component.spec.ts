import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlistHeaderComponent } from './glist-header.component';

describe('GlistHeaderComponent', () => {
  let component: GlistHeaderComponent;
  let fixture: ComponentFixture<GlistHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlistHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlistHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
