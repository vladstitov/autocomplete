import { TestBed } from '@angular/core/testing';

import { TextInputService } from './text-input.service';

describe('TextInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextInputService = TestBed.get(TextInputService);
    expect(service).toBeTruthy();
  });
});
