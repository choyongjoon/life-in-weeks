import React, { Component } from 'react'
import { Container, Header, Menu } from 'semantic-ui-react'
import WeekMatrix from './components/WeekMatrix'

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
        <Container text className="App-container">
          <Header as="h1">Life in Weeks</Header>
          <WeekMatrix cells={cells} />
        </Container>
      </div>
    )
  }
}

export default App
