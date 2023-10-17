import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlistSidebarComponent } from './glist-sidebar.component';

describe('GlistSidebarComponent', () => {
  let component: GlistSidebarComponent;
  let fixture: ComponentFixture<GlistSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlistSidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GlistSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
