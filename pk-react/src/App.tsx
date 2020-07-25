import React, { Fragment } from 'react'
import { Either, Option } from 'standard-data-structures'
import './App.css'
import { AppResponse, User } from './App.types'
import logo from './logo.svg'

interface AppState {
  isLoading: boolean
  response: Either<string, AppResponse>
  page: number
  selectedUser: Option<User>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isLoading: false,
      response: Either.left('Nothing Fetched'),
      page: 0,
      selectedUser: Option.none()
    }
  }

  getUsers() {
    const { page } = this.state
    this.setState(
      {
        isLoading: true
      },
      () => fetch(`https://api.github.com/users?since${page}`)
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          else throw Error(response.statusText)
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
                    <Fragment>
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
                  )).getRightOrElse(
                    <div>{this.state.response.getLeftOrElse('Something went wrong')}</div>
                  )}
              </div>
              <div className="chart">Chart</div>
            </div>
          )}
      </div>
    )
  }
}

export default App
