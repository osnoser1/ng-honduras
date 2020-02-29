import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { reducer } from './store/posts.reducer';
import { PostsEffects } from './store/posts.effects';
import { PostTablePreviewComponent } from './post-list/post-table-preview/post-table-preview.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostListComponent,
    PostTablePreviewComponent,
    PostDetailComponent,
  ],
  imports: [
    PostRoutingModule,
    StoreModule.forFeature('posts', reducer),
    EffectsModule.forFeature([PostsEffects]),
    SharedModule,
  ],
})
export class PostModule {}
