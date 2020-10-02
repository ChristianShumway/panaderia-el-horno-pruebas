import { TestBed } from '@angular/core/testing';

import { ProveedorService } from './proveedor.service';

describe('VentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorService = TestBed.get(ProveedorService);
    expect(service).toBeTruthy();
  });
});
