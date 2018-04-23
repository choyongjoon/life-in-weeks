import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Header, Segment } from 'semantic-ui-react'

class Config extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      dob: PropTypes.string.isRequired,
      lifeExpectancy: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    calendar: PropTypes.shape({
      name: PropTypes.string.isRequired,
      events: PropTypes.array.isRequired
    }),
    editProfile: PropTypes.func.isRequired,
    editCalendar: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired
  }

  onChangeLifeExpectancy = e => {
    const { editProfile } = this.props
    let lifeExpectancy = parseInt(e.target.value, 10)
    if (isNaN(lifeExpectancy)) lifeExpectancy = ''
    editProfile({ lifeExpectancy })
  }

  render() {
    const {
      profile,
      editProfile,
      calendar,
      editCalendar,
      addEvent,
      editEvent
    } = this.props
    const { dob, lifeExpectancy } = profile
    const { name, events } = calendar

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
                label="Life Expectancy"
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
              value={name}
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

const colorOptions = [
  { key: 'n', text: 'Navy', value: '#001f3f' },
  { key: 'blu', text: 'Blue', value: '#0074D9' },
  { key: 'a', text: 'Aqua', value: '#7FDBFF' },
  { key: 't', text: 'Teal', value: '#39CCCC' },
  { key: 'ol', text: 'Olive', value: '#3D9970' },
  { key: 'gre', text: 'Green', value: '#2ECC40' },
  { key: 'l', text: 'Lime', value: '#01FF70' },
  { key: 'y', text: 'Yellow', value: '#FFDC00' },
  { key: 'or', text: 'Orange', value: '#FF851B' },
  { key: 'r', text: 'Red', value: '#FF4136' },
  { key: 'm', text: 'Maroon', value: '#F012BE' },
  { key: 'f', text: 'Fuchsia', value: '#F012BE' },
  { key: 'p', text: 'Purple', value: '#B10DC9' },
  { key: 'bla', text: 'Black', value: '#111111' },
  { key: 'gra', text: 'Gray', value: '#AAAAAA' },
  { key: 's', text: 'Silver', value: '#DDDDDD' },
  { key: 'w', text: 'White', value: '#FFFFFF' }
]
