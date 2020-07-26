import React, {Fragment} from 'react'
import {Either, Option} from 'standard-data-structures'
import './App.css'
import {AppResponse, User} from './App.types'
import logo from './logo.svg'
import UserRepo from './components/UserRepos/UserRepo'

interface AppState {
  isLoading: boolean
  response: Either<string, AppResponse>
  page: number
  selectedUser: Option<User>
}

class App extends React.Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
    super(props)
    this.state = {
      isLoading: false,
      response: Either.left('Nothing fetched'),
      page: 0,
      selectedUser: Option.none()
    }
  }

  getUsers() {
    const {page} = this.state
    this.setState(
      {
        isLoading: true
      },
      () =>
        fetch(`https://api.github.com/users?since${page}`)
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else throw Error(response.statusText)
          })
          .then((json: User[]) => {
            this.setState({
              isLoading: false,
              response: Either.right({
                data: json
              }),
              page: json[json.length - 1].id
            })
          })
          .catch((reason: Error) => {
            this.setState({
              isLoading: false,
              response: Either.left(reason.message),
              page: 0,
              selectedUser: Option.none()
            })
          })
    )
  }

  componentDidMount() {
    this.getUsers()
  }

  onClick(username: User) {
    this.setState({
      selectedUser: Option.some(username)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : (
          <div className="layout">
            <div className="users">
              {this.state.response
                .map((res) => (
                  <Fragment key={'all-users'}>
                    {res.data.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => {
                          this.onClick(user)
                        }}
                      >
                        {user.login}
                      </div>
                    ))}
                  </Fragment>
                ))
                .getRightOrElse(
                  <div>
                    {this.state.response.getLeftOrElse('Something went wrong')}
                  </div>
                )}
            </div>
            <div className="chart">
              {this.state.selectedUser
                .map((user) => (
                  <UserRepo
                    key={`${user.id}-chart`}
                    repoUrl={user.repos_url}
                    username={user.login}
                  />
                ))
                .getOrElse(<div>Please Select A User</div>)}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
