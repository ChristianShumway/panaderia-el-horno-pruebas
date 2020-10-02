import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFamiliaComponent } from './modificar-familia.component';

describe('ModificarFamiliaComponent', () => {
  let component: ModificarFamiliaComponent;
  let fixture: ComponentFixture<ModificarFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
