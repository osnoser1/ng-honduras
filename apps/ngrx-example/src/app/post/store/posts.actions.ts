import { createAction, props } from '@ngrx/store';

import { Post, PostQuery } from '../../core/models/entities';

export const loadPosts = createAction(
  '[Posts] Load Posts',
  props<{ query?: PostQuery }>(),
);

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[]; total: number }>(),
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: any }>(),
);

export const loadPostsDetail = createAction(
  '[Posts] Load Posts Detail',
  props<{ id: number }>(),
);

export const savePost = createAction(
  '[Posts] Save Post',
  props<{ post: Post }>(),
);

export const savePostSuccess = createAction(
  '[Posts] Save Post Success',
  props<{ post: Post }>(),
);

export const updatePostDetail = createAction(
  '[Posts] Update Post Detail',
  props<{ post: Post }>(),
);
