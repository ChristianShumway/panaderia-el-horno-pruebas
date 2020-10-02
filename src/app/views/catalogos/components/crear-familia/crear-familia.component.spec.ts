import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFamiliaComponent } from './crear-familia.component';

describe('CrearFamiliaComponent', () => {
  let component: CrearFamiliaComponent;
  let fixture: ComponentFixture<CrearFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
