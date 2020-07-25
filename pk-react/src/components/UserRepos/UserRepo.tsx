import * as Highcharts from 'highcharts'
import HighChartsReact from 'highcharts-react-official'
import React, {Fragment} from 'react'
import {Either} from 'standard-data-structures'
import {RepoData, UserRepoProps, UserRepoState} from './UserRepo.types'

const randomColour = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

class UserRepo extends React.Component<UserRepoProps, UserRepoState> {
  constructor(props: UserRepoProps) {
    super(props)

    this.state = {
      isLoading: false,
      response: Either.left('Nothing fetched')
    }
  }

  fetchRepos() {
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
              response:
                json.length > 0
                  ? Either.right(json)
                  : Either.left('No Repos Found')
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

  componentDidMount() {
    this.fetchRepos()
  }

  render() {
    return (
      <div>
        {this.state.response
          .map((data) => {
            const dataBySeries = data.reduce<Record<string, RepoData[]>>(
              (acc, val) => {
                acc[val.language] =
                  acc[val.language] === undefined
                    ? Array.of(val)
                    : acc[val.language].concat(Array.of(val))

                return acc
              },
              {}
            )

            const series = Object.keys(dataBySeries).map((key) => ({
              name: key,
              color: randomColour(),
              data: dataBySeries[key].map((repo) => [
                  repo.open_issues_count,
                repo.stargazers_count,
                
              ])
            }))

            return (
              <Fragment key={'all-repos'}>
                <div>{`${this.props.username} has ${data.length} Repos`}</div>
                <HighChartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: 'scatter'
                    },
                    title: {
                      text: 'Stars vs OpenIssueCount'
                    },
                    xAxis: {
                      title: {
                        enabled: true,
                        text: "#🐞's"
                      },
                      startOnTick: true,
                      endOnTick: true,
                      showLastLabel: true
                    },
                    yAxis: {
                      title: {
                        text: "#⭐️'s"
                      }
                    },
                    plotOptions: {
                      scatter: {
                        marker: {
                          radius: 5,
                          states: {
                            hover: {
                              enabled: true,
                              lineColor: '#323232'
                            }
                          }
                        },
                        tooltip: {
                          headerFormat: '<b>{series.name}</b><br>',
                          pointFormat: '{point.x} issues, {point.y} stars'
                        }
                      }
                    },
                    series
                  }}
                />
              </Fragment>
            )
          })
          .getRightOrElse(
            <div>
              {this.state.isLoading
                ? 'Loading...'
                : this.state.response.getLeftOrElse('Something Went Wrong')}
            </div>
          )}
      </div>
    )
  }
}

export default UserRepo
