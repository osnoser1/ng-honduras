export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostQuery {
  _page?: string | number;
  _limit?: string | number;
}
