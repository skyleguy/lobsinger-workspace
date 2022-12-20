import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlistContainerComponent } from './glist-container.component';

describe('GlistContainerComponent', () => {
  let component: GlistContainerComponent;
  let fixture: ComponentFixture<GlistContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlistContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlistContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
