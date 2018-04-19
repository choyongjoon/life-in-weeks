import React, { Component } from 'react';
import { Container, Header, Menu } from 'semantic-ui-react';

import './App.css';

class App extends Component {
  render() {
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
        </Container>
      </div>
    );
  }
}

export default App;
