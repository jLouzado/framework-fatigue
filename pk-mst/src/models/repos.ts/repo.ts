import {types} from 'mobx-state-tree'

export const Repo = types.model({
  id: types.number,
  name: types.string,
  description: types.string,
  forks_count: types.number,
  stargazers_count: types.number,
  watchers_count: types.number,
  size: types.number,
  open_issues_count: types.number,
  language: types.maybeNull(types.string)
})
