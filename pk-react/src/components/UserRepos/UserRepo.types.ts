import {Either} from 'standard-data-structures'
import {URL} from '../../App.types'

export type RepoData = {
  id: number
  name: string
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  open_issues_count: number
}

type UserRepoResponse = RepoData[]

export interface UserRepoState {
  isLoading: boolean
  response: Either<string, UserRepoResponse>
}

export interface UserRepoProps {
    repoUrl: URL
}
