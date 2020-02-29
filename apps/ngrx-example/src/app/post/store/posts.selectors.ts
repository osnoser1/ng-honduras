import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  POSTS_DETAIL_FEATURE_KEY,
  POSTS_FEATURE_KEY,
  postsAdapter,
  PostsPartialState,
  PostsState,
} from './posts.reducer';
import { selectRouteParam } from '../../store/reducers';
import { Post } from '../../core/models/entities';

export const getPostsState = createFeatureSelector<PostsPartialState>('posts');

// Lookup the 'Posts' feature state managed by NgRx
export const getPostsDetailState = createSelector(
  getPostsState,
  state => state[POSTS_DETAIL_FEATURE_KEY],
);

// Lookup the 'Posts' feature state managed by NgRx
export const getPostsCollectionState = createSelector(
  getPostsState,
  state => state[POSTS_FEATURE_KEY],
);

const { selectAll, selectEntities } = postsAdapter.getSelectors();

export const getPostsLoaded = createSelector(
  getPostsCollectionState,
  (state: PostsState) => state.loaded,
);

export const getAllPosts = createSelector(getPostsCollectionState, state => {
  console.log(state);
  return selectAll(state);
});

export const getPostsEntities = createSelector(
  getPostsCollectionState,
  (state: PostsState) => selectEntities(state),
);

export const getPostsDetailEntities = createSelector(
  getPostsDetailState,
  state => selectEntities(state),
);

export const getSelectedId = createSelector(
  getPostsDetailState,
  state => state.selectedId,
);

export const getSelected = createSelector(
  getPostsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId],
);

export const getPostsError = createSelector(
  getPostsDetailState,
  state => state.error,
);

export const getQueryState = createSelector(
  getPostsCollectionState,
  state => state.query,
);

export const getTotalPosts = createSelector(
  getPostsCollectionState,
  state => state.total,
);

export const selectSelectedPostId: (
  state: any,
) => string | undefined = selectRouteParam('id');

export const selectPost = createSelector(
  getPostsDetailEntities,
  selectSelectedPostId,
  (posts, postId) => (postId && posts[postId]) || ({} as Post),
);
