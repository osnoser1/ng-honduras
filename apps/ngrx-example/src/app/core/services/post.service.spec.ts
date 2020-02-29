import { TestBed } from '@angular/core/testing';

import { PostService } from 'apps/ngrx-example/src/app/core/services/post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
