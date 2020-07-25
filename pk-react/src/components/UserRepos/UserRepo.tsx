import React from 'react'
import { Either } from 'standard-data-structures'
import { RepoData, UserRepoProps, UserRepoState } from './UserRepo.types'

class UserRepo extends React.Component<UserRepoProps, UserRepoState> {
  constructor(props: UserRepoProps) {
    super(props)

    this.state = {
      isLoading: false,
      response: Either.left('Nothing Loaded')
    }
  }

  componentDidMount() {
    this.setState(
      {
        isLoading: true
      },
      () =>
        fetch(this.props.repoUrl)
          .then((response) => {
            if (response.ok) return response.json()
            else throw new Error(response.statusText)
          })
          .then((json: RepoData[]) => {
            this.setState({
              isLoading: false,
              response: Either.right(json)
            })
          })
          .catch((err: Error) => {
            this.setState({
              isLoading: false,
              response: Either.left(err.message)
            })
          })
    )
  }

  render() {
    return this.state.response
      .map((data) => <div key={'all-repos'}>{`${data.length}: ${data[0].name}`}</div>)
      .getRightOrElse(
        <div>
          {this.state.isLoading
            ? 'Loading...'
            : this.state.response.getLeftOrElse('Something Went Wrong')}
        </div>
      )
  }
}

export default UserRepo
