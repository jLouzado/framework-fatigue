import {observable} from 'mobx'
import {Either, Option} from 'standard-data-structures'
import {User} from '../App.types'

export default class Users {
  @observable users: Either<string, User[]> = Either.left('Nothing was fetched')
  @observable selectedUser: Option<User> = Option.none()
  @observable page = 0
}
