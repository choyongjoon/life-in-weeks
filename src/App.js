import React, { Component } from 'react'
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import range from 'lodash/range'

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
    let cells = []
    if (!isNaN(new Date(dob).getTime())) {
      cells = range(numRows * numWeeks).map(index => {
        // TODO: change this date to correct years
        const start = new Date(dob)
        start.setDate(start.getDate() + index * numDays)
        const end = new Date(dob)
        end.setDate(end.getDate() + (index + 1) * numDays - 1)

        return {
          index,
          title: `${getDateString(start)} ~ ${getDateString(end)} (${index +
            1})`,
          start,
          end
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
            <WeekMatrix cells={cells} />
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

const getDateString = date => {
  return date.toISOString().slice(0, 10)
}

const numWeeks = 52
const numDays = 7
