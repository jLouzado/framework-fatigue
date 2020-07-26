import {types} from 'mobx-state-tree'
import {UserData} from '../../App.types'
import {urlFrom} from '../url/url.model'
import {User, ModelUsers} from '../users.ts/user'

export const MainModel = types
  .model({
    users: types.maybe(ModelUsers),
    errorMsg: types.maybe(types.string),
    isLoading: types.boolean,
    page: types.number,
    selectedUser: types.maybe(types.reference(User))
  })
  .actions((self) => ({
    setError: (err: string) => {
      self.errorMsg = err
    },
    setUsers: (users: UserData[]) => {
      self.users = ModelUsers.create(
        users.map((user) => ({
          ...user,
          avatarUrl: urlFrom(user.avatar_url),
          reposUrl: urlFrom(user.repos_url),
          profileUrl: urlFrom(user.url)
        }))
      )
    }
  }))
  .actions((self) => ({
    async fetchUsers() {
      const response = await fetch(
        `https://api.github.com/users?since${self.page}`
      )
      if (response.ok) {
        const json: UserData[] = await response.json()
        self.setUsers(json)
      } else {
        self.setError(response.statusText)
      }
    }
  }))

export const MainModelInit = () =>
  MainModel.create({
    isLoading: false,
    page: 0
  })
