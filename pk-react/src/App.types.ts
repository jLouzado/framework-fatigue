type URL = string

export type User = {
  login: string
  id: number
  avatar_url: URL
  url: URL
  repos_url: URL
  name: string
  bio: string
  public_repos: number
  followers: number
}

export type AppResponse = {
  data: Array<User>
}
