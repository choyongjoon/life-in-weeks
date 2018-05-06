import * as React from 'react'
import { Button, Form, Header, List } from 'semantic-ui-react'

import LifeEventItem from './LifeEventItem'

export interface IConfigProps {
  profile: {
    dob: string
    lifeExpectancy: number | string
  }
  calendar: {
    name: string
    events: any[]
  }
  editProfile: any
  editCalendar: any
  addEvent: any
  editEvent: any
}

class Config extends React.Component<IConfigProps, {}> {
  public state = {
    editingEventId: null
  }

  public onChangeLifeExpectancy = (e: React.FormEvent<HTMLInputElement>) => {
    const { editProfile } = this.props
    let lifeExpectancy: number | string = parseInt(e.currentTarget.value, 10)
    if (isNaN(lifeExpectancy)) lifeExpectancy = ''
    editProfile({ lifeExpectancy })
  }

  public startEditting = (editingEventId: number) =>
    this.setState({ editingEventId })

  public render() {
    const {
      profile,
      editProfile,
      calendar,
      editCalendar,
      addEvent,
      editEvent
    } = this.props
    const { editingEventId } = this.state
    const { dob, lifeExpectancy } = profile
    const { name: calendarName, events } = calendar

    return (
      <div>
        <Header as="h3">Profile</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Date of Birth</label>
              <input
                placeholder="2018-04-19"
                type="text"
                value={dob}
                onChange={e => editProfile({ dob: e.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Life Expectancy</label>
              <input
                placeholder="80"
                type="number"
                value={lifeExpectancy}
                onChange={this.onChangeLifeExpectancy}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        <Header as="h3">Calendar</Header>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              type="text"
              value={calendarName}
              onChange={e => editCalendar({ name: e.target.value })}
            />
          </Form.Field>
        </Form>
        <Header as="h4">Events</Header>
        <List celled>
          {events.map(event => {
            const isEditing = event.id === editingEventId
            return (
              <LifeEventItem
                key={event.id}
                event={event}
                isEditing={isEditing}
                startEditting={this.startEditting}
                editEvent={editEvent}
              />
            )
          })}
          <Button content="Add Event" onClick={addEvent} />
        </List>
      </div>
    )
  }
}

export default Config
