import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLetterComponent } from './new-letter.component';

describe('NewLetterComponent', () => {
  let component: NewLetterComponent;
  let fixture: ComponentFixture<NewLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
