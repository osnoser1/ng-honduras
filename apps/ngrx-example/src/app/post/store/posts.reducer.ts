import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { isNil, omitBy } from 'lodash-es';

import * as PostsActions from './posts.actions';
import { Post, PostQuery } from '../../core/models/entities';

export const POSTS_FEATURE_KEY = 'postsCollection';
export const POSTS_DETAIL_FEATURE_KEY = 'postsDetail';

export interface PostsState extends EntityState<Post> {
  loaded: boolean; // has the Posts list been loaded
  query: PostQuery;
  total: number;
}

export interface PostsDetailState extends EntityState<Post> {
  selectedId?: string | number; // which Posts record has been selected
  loaded: boolean; // has the Posts list been loaded
  error?: string | null; // last none error (if any)
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
  readonly [POSTS_DETAIL_FEATURE_KEY]: PostsDetailState;
}

export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialPostState: PostsState = postsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  query: { _limit: 10, _page: 1 },
  total: 0,
});

export const initialPostDetailState: PostsDetailState = postsAdapter.getInitialState(
  { loaded: false },
);

export const initialState: PostsPartialState = {
  [POSTS_FEATURE_KEY]: initialPostState,
  [POSTS_DETAIL_FEATURE_KEY]: initialPostDetailState,
};

const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state, { query }) => ({
    ...state,
    postsCollection: {
      ...state.postsCollection,
      loaded: false,
      error: null,
      query: omitBy({ ...state.postsCollection.query, ...query }, isNil),
    },
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts, total }) => ({
    ...state,
    postsCollection: postsAdapter.setAll(posts, {
      ...state.postsCollection,
      loaded: true,
      total,
    }),
  })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PostsActions.savePostSuccess, (state, { post }) => ({
    ...state,
    postsDetail: postsAdapter.addOne(post, state.postsDetail),
  })),
  on(PostsActions.updatePostDetail, (state, { post }) => ({
    ...state,
    postsDetail: postsAdapter.upsertOne(post, state.postsDetail),
  })),
);

export function reducer(state: PostsPartialState | undefined, action: Action) {
  return postsReducer(state, action);
}
