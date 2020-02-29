import { PostsEntity } from 'apps/ngrx-example/src/app/post/store/posts.models';
import { PostsState, postsAdapter, initialState } from 'apps/ngrx-example/src/app/post/store/posts.reducer';
import * as PostsSelectors from 'apps/ngrx-example/src/app/post/store/posts.selectors';

describe('Posts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPostsId = it => it['id'];
  const createPostsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PostsEntity);

  let state;

  beforeEach(() => {
    state = {
      posts: postsAdapter.addAll(
        [
          createPostsEntity('PRODUCT-AAA'),
          createPostsEntity('PRODUCT-BBB'),
          createPostsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('Posts Selectors', () => {
    it('getAllPosts() should return the list of Posts', () => {
      const results = PostsSelectors.getAllPosts(state);
      const selId = getPostsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PostsSelectors.getSelected(state);
      const selId = getPostsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getPostsLoaded() should return the current 'loaded' status", () => {
      const result = PostsSelectors.getPostsLoaded(state);

      expect(result).toBe(true);
    });

    it("getPostsError() should return the current 'error' state", () => {
      const result = PostsSelectors.getPostsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
