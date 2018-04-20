import React, { Component } from 'react'
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import WeekMatrix from './components/WeekMatrix'
import Config from './components/Config'

import './App.css'

class App extends Component {
  state = {
    profile: {
      dob: '2018/04/19',
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
    const lifeExpectancy = 80
    const cells = new Array(lifeExpectancy * 52)

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
