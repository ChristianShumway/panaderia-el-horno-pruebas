import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoGafeteComponent } from './foto-gafete.component';

describe('FotoGafeteComponent', () => {
  let component: FotoGafeteComponent;
  let fixture: ComponentFixture<FotoGafeteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoGafeteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoGafeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
