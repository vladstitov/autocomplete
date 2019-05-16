import { TestBed } from '@angular/core/testing';

import { SearchNamesService } from './search-names.service';

describe('SearchNamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchNamesService = TestBed.get(SearchNamesService);
    expect(service).toBeTruthy();
  });
});
