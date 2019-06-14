import { TestBed } from '@angular/core/testing';

import { ItemMenuService } from './item-menu.service';

describe('ItemMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemMenuService = TestBed.get(ItemMenuService);
    expect(service).toBeTruthy();
  });
});
