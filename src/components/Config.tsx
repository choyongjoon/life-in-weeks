import * as React from 'react'
import { Button, Form, Header, Segment } from 'semantic-ui-react'

import colors from '../colors'
const colorOptions = colors.map(x => ({
  key: x.name,
  text: x.name,
  value: x.value
}))

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
  public onChangeLifeExpectancy = (e: React.FormEvent<HTMLInputElement>) => {
    const { editProfile } = this.props
    let lifeExpectancy: number | string = parseInt(e.currentTarget.value, 10)
    if (isNaN(lifeExpectancy)) lifeExpectancy = ''
    editProfile({ lifeExpectancy })
  }

  public render() {
    const {
      profile,
      editProfile,
      calendar,
      editCalendar,
      addEvent,
      editEvent
    } = this.props
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
        <Segment.Group>
          {events.map(event => {
            return (
              <Segment key={event.id}>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Name</label>
                      <input
                        type="text"
                        value={event.name}
                        onChange={e =>
                          editEvent(event.id, { name: e.target.value })
                        }
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Start</label>
                      <input
                        placeholder="2018-04-19"
                        type="text"
                        value={event.start}
                        onChange={e =>
                          editEvent(event.id, { start: e.target.value })
                        }
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>End</label>
                      <input
                        placeholder="2018-04-19"
                        type="text"
                        value={event.end}
                        onChange={e =>
                          editEvent(event.id, { end: e.target.value })
                        }
                      />
                    </Form.Field>
                  </Form.Group>
                  <Header as="h5">Style</Header>
                  <Form.Group widths="equal">
                    <Form.Select
                      inline
                      label="Color"
                      name="fill"
                      options={colorOptions}
                      value={event.style.fill}
                      onChange={(e, { name, value }) =>
                        editEvent(event.id, {
                          style: Object.assign({}, event.style, {
                            [name]: value
                          })
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Segment>
            )
          })}
          <Button attached="bottom" content="Add Event" onClick={addEvent} />
        </Segment.Group>
      </div>
    )
  }
}

export default Config
