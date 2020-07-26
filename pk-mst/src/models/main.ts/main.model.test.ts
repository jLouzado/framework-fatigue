import {assert} from 'chai'
import {urlFrom} from '../url/url.model'
import {User} from '../users.ts/user'
import {MainModelInit} from './main.model'
import {getSnapshot} from 'mobx-state-tree'

describe('mainModel', () => {
  describe('init', () => {
    it('should create a default state', () => {
      const actual = getSnapshot(MainModelInit())
      const expected = {
        users: undefined,
        isLoading: false,
        page: 0,
        selectedUser: undefined,
        errorMsg: undefined
      }

      assert.deepEqual(actual, expected)
    })
  })
  describe('actions', () => {
    describe('loadUsers', () => {
      it.todo('should load users')
    })
    describe('saveUsers', () => {
      it('should save users in state', () => {
        const state = MainModelInit()
        const response = [
          {
            login: 'mojombo',
            id: 1,
            avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
            url: 'https://api.github.com/users/mojombo',
            repos_url: 'https://api.github.com/users/mojombo/repos'
          },
          {
            login: 'defunkt',
            id: 2,
            avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
            url: 'https://api.github.com/users/defunkt',
            repos_url: 'https://api.github.com/users/defunkt/repos'
          }
        ]

        state.setUsers(response)

        const expected = response.map((user) =>
          User.create({
            ...user,
            avatarUrl: urlFrom(user.avatar_url),
            reposUrl: urlFrom(user.repos_url),
            profileUrl: urlFrom(user.url)
          })
        )

        assert.deepEqual(getSnapshot(state).users, expected)
      })
    })
  })
})
