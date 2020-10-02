import { TestBed } from '@angular/core/testing';

import { FamiliaService } from './familia.service';

describe('FamiliaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamiliaService = TestBed.get(FamiliaService);
    expect(service).toBeTruthy();
  });
});
