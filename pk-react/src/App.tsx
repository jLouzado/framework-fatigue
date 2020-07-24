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
      response: Either.left('Nothing was fetched'),
      page: 0,
      selectedUser: Option.none()
    }
  }

  getUsers() {
    this.setState({
      isLoading: true
    }, () => fetch('https://api.github.com/users')
      .then((response) => response.json()).then(json => {
        this.setState({
          isLoading: false,
          response: Either.right({
            data: json
          })
        })
      })
      .catch((reason) =>
        this.setState({
          isLoading: false,
          response: Either.left(reason)
        })
      ))
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
            this.state.response
              .map((res) => <Fragment>{res.data.map(user => <div key={user.id} onClick={() => { this.onClick(user) }}>{user.login}</div>)}</Fragment>)
              .getRightOrElse(
                <div>
                  {this.state.response.getLeftOrElse('Something Went Wrong')}
                </div>
              )

          )}
      </div>
    )
  }
}

export default App
