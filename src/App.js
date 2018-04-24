import React, { Component } from 'react'
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import isNil from 'lodash/isNil'
import range from 'lodash/range'

import getDateString from './utils/getDateString'
import dateDiffInDays from './utils/dateDiffInDays'

import WeekMatrix from './components/WeekMatrix'
import Config from './components/Config'

import './App.css'

class App extends Component {
  state = {
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

  componentDidMount() {
    const stateStr = localStorage.getItem('state')
    if (!stateStr) return

    try {
      const state = JSON.parse(stateStr)
      this.setState(state)
    } catch (err) {
      console.error('failed to parse state from local storage')
    }
  }

  setState(stateChange) {
    super.setState(stateChange, () => {
      localStorage.setItem('state', JSON.stringify(this.state))
    })
  }

  editProfile = change => {
    const { profile } = this.state
    const newProfile = Object.assign({}, profile, change)
    this.setState({ profile: newProfile })
  }

  editCalendar = change => {
    const { calendar } = this.state
    const newCalendar = Object.assign({}, calendar, change)
    this.setState({ calendar: newCalendar })
  }

  addEvent = () => {
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

  editEvent = (eventId, change) => {
    const { calendar } = this.state
    const { events } = calendar
    const eventIndex = events.findIndex(event => event.id === eventId)
    if (eventIndex < 0) return

    const newEvents = [...events]
    newEvents[eventIndex] = Object.assign({}, events[eventIndex], change)
    this.editCalendar({ events: newEvents })
  }

  render() {
    const { profile, calendar } = this.state
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
            // title: `${getDateString(start)} ~ ${getDateString(end)} (${index + 1})`,
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

      for (const event of calendar.events) {
        applyEvent(years, event)
      }

      const today = new Date()
      const todayEvent = {
        name: 'Today',
        start: getDateString(today),
        end: getDateString(today),
        style: {
          type: 'circle',
          fill: '#FF4136'
        }
      }
      applyEvent(years, todayEvent)
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

const numWeeks = 52
const numDays = 7

const findWeeks = (years, event) => {
  const eventStart = new Date(event.start)
  const eventEnd = new Date(event.end)
  if (eventStart > eventEnd) return []

  const startIndex = findIndexInYears(years, eventStart)
  const endIndex = findIndexInYears(years, eventEnd)
  if (!startIndex) return []

  const weeksInRange = []
  const endYearIndex = endIndex ? endIndex.yearIndex : years.length - 1
  for (let i = startIndex.yearIndex; i <= endYearIndex; i++) {
    const { weeks } = years[i]
    let startWeekIndex = 0
    if (i === startIndex.yearIndex) startWeekIndex = startIndex.weekIndex
    let endWeekIndex = weeks.length - 1
    if (i === endYearIndex && endIndex && !isNil(endIndex.weekIndex))
      endWeekIndex = endIndex.weekIndex
    for (let j = startWeekIndex; j <= endWeekIndex; j++) {
      weeksInRange.push(weeks[j])
    }
  }
  return weeksInRange
}

const findIndexInYears = (years, date) => {
  if (!years[0]) return null

  const startYear = years[0].start.getFullYear()
  const dateYear = date.getFullYear()
  let yearIndex = dateYear - startYear
  let year = years[yearIndex]
  if (year && year.start > date) {
    yearIndex -= 1
    year = years[yearIndex]
  }
  if (!year) return null

  let { start, weeks } = year
  const daysDiff = dateDiffInDays(start, date)
  let weekIndex = Math.floor(daysDiff / numDays)
  if (weekIndex === 52 && daysDiff <= 365) weekIndex = 51
  if (!weeks[weekIndex]) return null

  return {
    yearIndex,
    weekIndex
  }
}

const applyEvent = (years, event) => {
  const weeks = findWeeks(years, event)
  weeks.forEach(week => {
    let durationStr = `${event.start} ~ ${event.end}`
    if (event.start === event.end) durationStr = `${event.start}`
    week.title = `${event.name} (${durationStr})`
    week.style = event.style
  })
}
