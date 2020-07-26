import {types} from 'mobx-state-tree'
import {URL} from '../url/url.model'

export const User = types.model({
  login: types.string,
  id: types.identifierNumber,
  avatarUrl: URL,
  profileUrl: URL,
  reposUrl: URL
})

export const ModelUsers = types.array(User)
