import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { PostsEffects } from 'apps/ngrx-example/src/app/post/store/posts.effects';
import * as PostsActions from 'apps/ngrx-example/src/app/post/store/posts.actions';

describe('PostsEffects', () => {
  let actions: Observable<any>;
  let effects: PostsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PostsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(PostsEffects);
  });

  describe('loadPosts$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PostsActions.loadPosts() });

      const expected = hot('-a-|', {
        a: PostsActions.loadPostsSuccess({ posts: [] }),
      });

      expect(effects.loadPosts$).toBeObservable(expected);
    });
  });
});
