import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlistContentComponent } from './glist-content.component';

describe('GlistContentComponent', () => {
  let component: GlistContentComponent;
  let fixture: ComponentFixture<GlistContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlistContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GlistContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
