import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryOutlineComponent } from './story-outline.component';

describe('StoryOutlineComponent', () => {
  let component: StoryOutlineComponent;
  let fixture: ComponentFixture<StoryOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
