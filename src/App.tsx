import * as React from 'react'
import { Container, Grid, Header, Menu } from 'semantic-ui-react'

import getDateString from './utils/getDateString'

import Life from './models/Life'

import Config from './components/Config'
import WeekMatrix from './components/WeekMatrix'

import './App.css'

class App extends React.Component {
  public state = {
    profile: {
      dob: '1990-01-01',
      lifeExpectancy: 80
    },
    calendar: {
      name: 'Test',
      events: [
        {
          id: 1,
          name: '2018',
          start: '2018-01-01',
          end: '2018-12-31',
          style: {
            fill: '#FFDC00'
          }
        },
        {
          id: 2,
          name: 'Today',
          start: '2018-04-23',
          end: '2018-04-23',
          style: {
            fill: '#FF4136'
          }
        }
      ]
    }
  }

  public componentDidMount() {
    const stateStr = localStorage.getItem('state')
    if (!stateStr) return

    try {
      const state = JSON.parse(stateStr)
      this.setState(state)
    } catch (err) {
      // console.error('failed to parse state from local storage')
    }
  }

  public setState(stateChange: any) {
    super.setState(stateChange, () => {
      localStorage.setItem('state', JSON.stringify(this.state))
    })
  }

  public editProfile = (change: any) => {
    const { profile } = this.state
    const newProfile = Object.assign({}, profile, change)
    this.setState({ profile: newProfile })
  }

  public editCalendar = (change: any) => {
    const { calendar } = this.state
    const newCalendar = Object.assign({}, calendar, change)
    this.setState({ calendar: newCalendar })
  }

  public addEvent = () => {
    const { calendar } = this.state
    const lastId =
      calendar.events.length > 0
        ? calendar.events[calendar.events.length - 1].id
        : 0
    const event = {
      id: lastId + 1,
      name: '',
      start: '',
      end: '',
      style: {}
    }
    const events = [...calendar.events, event]
    this.editCalendar({ events })
  }

  public editEvent = (eventId: number, change: any) => {
    const { calendar } = this.state
    const { events } = calendar
    const eventIndex = events.findIndex(event => event.id === eventId)
    if (eventIndex < 0) return

    const newEvents = [...events]
    newEvents[eventIndex] = Object.assign({}, events[eventIndex], change)
    this.editCalendar({ events: newEvents })
  }

  public render() {
    const { profile, calendar } = this.state
    const { dob, lifeExpectancy } = profile

    const life = new Life(dob, lifeExpectancy)

    for (const event of calendar.events) life.applyEvent(event)

    const today = new Date()
    const todayEvent = {
      name: 'Today',
      start: getDateString(today),
      end: getDateString(today),
      style: {
        type: 'circle',
        fill: '#fc5c65'
      }
    }
    life.applyEvent(todayEvent)

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
            <WeekMatrix life={life} />
          </Grid.Column>
          <Grid.Column>
            <Header as="h2">Config</Header>
            <Config
              profile={profile}
              calendar={calendar}
              editProfile={this.editProfile}
              editCalendar={this.editCalendar}
              addEvent={this.addEvent}
              editEvent={this.editEvent}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App
