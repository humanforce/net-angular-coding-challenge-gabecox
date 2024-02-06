import { TestBed } from '@angular/core/testing';

import { CurrentSprintService } from './current-sprint.service';

describe('CurrentSprintService', () => {
  let service: CurrentSprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
