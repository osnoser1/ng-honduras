import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Post } from '../../core/models/entities';
import { Store } from '@ngrx/store';
import { PostsPartialState } from '../store/posts.reducer';
import * as PostsActions from '../store/posts.actions';

const required = 'This field is required.';

@Component({
  selector: 'ng-honduras-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  form = this.fb.group({});
  validationMessages: Record<string, string | Record<string, string>>;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private store: Store<PostsPartialState>,
  ) {
    this.validationMessages = {
      title: { required },
      body: { required },
    };
  }

  ngOnInit() {
    this.map();
  }

  onSubmit() {
    this.form.updateValueAndValidity();
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const post: Post = this.form.getRawValue();
    this.store.dispatch(PostsActions.savePost({ post }));
  }

  private map(post?: Partial<Post>) {
    post = post ?? {};

    this.form = this.fb.group({
      id: [{ value: post.id, disabled: true }],
      title: [post.title, Validators.required],
      body: [post.body, Validators.required],
    });

    this.ref.markForCheck();
  }
}
