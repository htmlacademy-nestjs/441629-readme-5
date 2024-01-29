export enum ApplicationServiceURL {
  Users = 'http://localhost:3000/api/auth',
  Files = 'http://localhost:3020/api/files',
  Blog = 'http://localhost:3030/api/posts',
  Tags = 'http://localhost:3030/api/tags',
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
