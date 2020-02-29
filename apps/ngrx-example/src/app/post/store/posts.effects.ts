import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { EMPTY } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import * as PostsActions from '../../post/store/posts.actions';
import { PostService } from '../../core/services';
import {
  getQueryState,
  getSelectedPost,
  selectSelectedPostId,
} from './posts.selectors';
import { PostsPartialState } from './posts.reducer';
import { go } from '../../store/actions/router.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      withLatestFrom(this.store.pipe(select(getQueryState))),
      switchMap(([_, query]) => this.postService.getAll(query)),
      map(data => ({ posts: data.result, total: data.count })),
      map(PostsActions.loadPostsSuccess),
    ),
  );

  savePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.savePost),
      exhaustMap(({ post }) =>
        (post.id
          ? this.postService.update(post)
          : this.postService.add(post)
        ).pipe(
          map(updatedProject =>
            PostsActions.savePostSuccess({
              post: updatedProject,
            }),
          ),
          catchError(error => {
            console.log(error);
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  savePostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.savePostSuccess),
      map(() => go({ path: ['posts'] })),
    ),
  );

  loadPostDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter(({ payload: { routerState } }: { payload: any; type: string }) =>
        this.isPostDetailUrl(routerState.url),
      ),
      withLatestFrom(
        this.store.pipe(select(getSelectedPost)),
        this.store.pipe(select(selectSelectedPostId)),
      ),
      tap(console.log),
      filter(([, post]) => !post.id),
      switchMap(([, , id]) =>
        this.postService
          .get(id)
          .pipe(map(post => PostsActions.updatePostDetail({ post }))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private store: Store<PostsPartialState>,
  ) {}

  private isPostDetailUrl(url: string) {
    return /^\/posts\/\d+$/.test(url);
  }
}
