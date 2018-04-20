import React, { Component } from 'react'
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import range from 'lodash/range'

import getDateString from './utils/getDateString'
import dateDiffInDays from './utils/dateDiffInDays'

import WeekMatrix from './components/WeekMatrix'
import Config from './components/Config'

import './App.css'

class App extends Component {
  state = {
    profile: {
      dob: '2018-04-19',
      lifeExpectancy: 80
    }
  }

  editProfile = change => {
    const { profile } = this.state
    const newProfile = Object.assign({}, profile, change)
    this.setState({ profile: newProfile })
  }

  render() {
    const { profile } = this.state
    const { dob, lifeExpectancy } = profile

    const numRows = Math.min(lifeExpectancy, 200)
    let years = []
    if (!isNaN(new Date(dob).getTime())) {
      years = range(numRows).map(yearIndex => {
        const startOfYear = new Date(dob)
        startOfYear.setFullYear(startOfYear.getFullYear() + yearIndex)
        const endOfYear = new Date(dob)
        endOfYear.setFullYear(endOfYear.getFullYear() + yearIndex + 1)
        endOfYear.setDate(endOfYear.getDate() - 1)

        const weeks = range(numWeeks).map(weekIndex => {
          const index = yearIndex * numWeeks + weekIndex

          const start = new Date(startOfYear.getTime())
          start.setDate(start.getDate() + weekIndex * numDays)

          let end = new Date(startOfYear.getTime())
          end.setDate(end.getDate() + (weekIndex + 1) * numDays - 1)

          let numDaysInWeek = numDays

          const isLastWeek = weekIndex % numWeeks === numWeeks - 1
          if (isLastWeek) {
            end = new Date(endOfYear.getTime())
            numDaysInWeek = dateDiffInDays(start, end) + 1
          }

          return {
            index,
            title: `${getDateString(start)} ~ ${getDateString(end)} (${index +
              1})`,
            start,
            end,
            numDays: numDaysInWeek
          }
        })

        return {
          index: yearIndex,
          start: startOfYear,
          end: endOfYear,
          weeks
        }
      })
    }

    return (
      <div className="App">
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              Life in Weeks
            </Menu.Item>
          </Container>
        </Menu>
        <Grid container columns={2}>
          <Grid.Row />
          <Grid.Column>
            <Header as="h1">Life in Weeks</Header>
            <WeekMatrix years={years} />
          </Grid.Column>
          <Grid.Column>
            <Header as="h2">Config</Header>
            <Config profile={profile} editProfile={this.editProfile} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App

const numWeeks = 52
const numDays = 7
