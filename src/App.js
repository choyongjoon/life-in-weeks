import React, { Component } from 'react'
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import WeekMatrix from './components/WeekMatrix'
import Config from './components/Config'

import './App.css'

class App extends Component {
  render() {
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
            <Config />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App
