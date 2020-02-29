import { HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ListResponse } from '../../models/http/list-response';

export const toListResponse = (options?: { observe: 'result' }) => <T>(
  source: Observable<HttpResponse<T[]>>,
) =>
  source.pipe(
    map(
      (resp: HttpResponse<T[]>) =>
        ({
          result: resp.body,
          count: Number(resp.headers.get('X-Total-Count')),
        } as ListResponse<T>),
    ),
    map((r: ListResponse<T>) => (options && options.observe ? r.result : r)),
  );

export const catchErrorListResponse = (options?: { observe: 'result' }) => <T>(
  source: Observable<T[] | ListResponse<T>>,
) =>
  source.pipe(
    catchError(_ =>
      of(
        options && options.observe
          ? ([] as T[])
          : ({ result: [], count: 0 } as ListResponse<T>),
      ),
    ),
  );
