import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PostsPartialState } from '../store/posts.reducer';
import { Post, PostQuery } from '../../core/models/entities';
import {
  getAllPosts,
  getQueryState,
  getTotalPosts,
} from '../store/posts.selectors';
import * as PostsActions from '../store/posts.actions';

@Component({
  selector: 'ng-honduras-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  data$: Observable<Post[]>;
  query$: Observable<PostQuery>;
  total$: Observable<number>;

  constructor(private store: Store<PostsPartialState>) {
    this.data$ = this.store.pipe(select(getAllPosts));
    this.query$ = this.store.pipe(select(getQueryState));
    this.total$ = this.store.pipe(select(getTotalPosts));
  }

  ngOnInit(): void {
    this.onQueryChange();
  }

  onQueryChange(query?: PostQuery) {
    console.log(query);
    this.store.dispatch(PostsActions.loadPosts({ query }));
  }
}
