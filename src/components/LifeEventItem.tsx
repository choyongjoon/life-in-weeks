import * as React from 'react'
import { Form, List } from 'semantic-ui-react'

import StyleIcon from './StyleIcon'

import './LifeEventItem.css'

export interface ILifeEventItemProps {
  event: {
    id: number
    name: string
    start: string
    end: string
    style: {
      fill: string
    }
  }
  isEditing: boolean
  startEditting: any
  editEvent: any
}

export default class LifeEventItem extends React.Component<
  ILifeEventItemProps,
  {}
> {
  public onClick = () => this.props.startEditting(this.props.event.id)

  public editStyle = (change: {}) => {
    const { event, editEvent } = this.props
    editEvent(event.id, { style: Object.assign({}, event.style, change) })
  }

  public render() {
    const { event, editEvent, isEditing } = this.props

    const duration =
      event.start === event.end ? event.start : `${event.start} ~ ${event.end}`

    if (isEditing) {
      return (
        <List.Item>
          <StyleIcon style={event.style} editStyle={this.editStyle} />
          <List.Content>
            <Form size="small">
              <Form.Group inline className="LifeEventFormGroup">
                <Form.Field width={8}>
                  <input
                    type="text"
                    value={event.name}
                    onChange={e =>
                      editEvent(event.id, { name: e.target.value })
                    }
                    autoFocus
                    style={{ fontWeight: 'bold' }}
                  />
                </Form.Field>
                <Form.Field width={4}>
                  <input
                    placeholder="2018-04-19"
                    type="text"
                    value={event.start}
                    onChange={e =>
                      editEvent(event.id, { start: e.target.value })
                    }
                  />
                </Form.Field>
                <Form.Field width={4}>
                  <label>~</label>
                  <input
                    placeholder="2018-04-19"
                    type="text"
                    value={event.end}
                    onChange={e => editEvent(event.id, { end: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </List.Content>
        </List.Item>
      )
    }

    return (
      <List.Item style={{ cursor: 'text' }} onClick={this.onClick}>
        <StyleIcon style={event.style} editStyle={this.editStyle} />
        <List.Content>
          <List.Header>{event.name}</List.Header>
          <List.Description>{duration}</List.Description>
        </List.Content>
      </List.Item>
    )
  }
}
