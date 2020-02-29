import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post, PostQuery } from '../models/entities/post';
import {
  catchErrorListResponse,
  toListResponse,
} from '../utils/rx/list-response';
import { ListResponse } from '../models/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  add(post: Post) {
    return this.http.post<Post>(this.apiUrl, { ...post, userId: 1 });
  }

  get(id: number) {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  getAll(query?: PostQuery): Observable<ListResponse<Post>>;

  getAll(query?: PostQuery, options?: { observe: 'result' }) {
    const params = new HttpParams({
      fromObject: (query as Record<string, string>) || {},
    });
    return this.http
      .get<Post[]>(this.apiUrl, { params, observe: 'response' })
      .pipe(toListResponse(), catchErrorListResponse());
  }

  update(post: Post) {
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post);
  }

  delete(id: number) {
    return this.http.delete<Post>(`${this.apiUrl}/${id}`);
  }
}
