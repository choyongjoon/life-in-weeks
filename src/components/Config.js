import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Header } from 'semantic-ui-react'

class Config extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      dob: PropTypes.string.isRequired,
      lifeExpectancy: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  }

  onChangeLifeExpectancy = e => {
    const { editProfile } = this.props
    let lifeExpectancy = parseInt(e.target.value, 10)
    if (isNaN(lifeExpectancy)) lifeExpectancy = ''
    editProfile({ lifeExpectancy })
  }

  render() {
    const { profile, editProfile } = this.props
    const { dob, lifeExpectancy } = profile

    return (
      <div>
        <Header as="h3">Profile</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Date of Birth</label>
              <input
                placeholder="2018/04/19"
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
      </div>
    )
  }
}

export default Config
