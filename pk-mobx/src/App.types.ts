export type URL = string

export type User = {
  login: string
  id: number
  avatar_url: URL
  url: URL
  repos_url: URL
}

export type AppResponse = {
  data: Array<User>
}
