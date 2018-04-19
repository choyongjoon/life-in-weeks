import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class Config extends Component {
  static propTypes = {}

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="Date of Birth" placeholder="Date of Birth" />
          <Form.Input
            fluid
            label="Life Expectancy"
            placeholder="Life Expectancy"
          />
        </Form.Group>
      </Form>
    )
  }
}

export default Config
