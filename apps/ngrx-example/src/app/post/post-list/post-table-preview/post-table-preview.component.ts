import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Post, PostQuery } from '../../../core/models/entities';

@Component({
  selector: 'ng-honduras-post-table-preview',
  templateUrl: './post-table-preview.component.html',
  styleUrls: ['./post-table-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostTablePreviewComponent {
  @Input() data?: Post[];
  @Input() query?: PostQuery;
  @Input() total?: number;

  @Output() queryChange = new EventEmitter<PostQuery>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  readonly displayedColumns = ['action', 'id', 'title', 'body'];

  onQueryChange(event: PageEvent) {
    const _page = event.pageSize !== this.query?._limit ? 0 : event.pageIndex + 1;
    this.queryChange.emit({ _page, _limit: event.pageSize });
  }
}
