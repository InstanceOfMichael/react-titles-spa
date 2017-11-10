import React from 'react';
import { Route, Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import Home from '../home'
import About from '../about'
import Titles from '../titles'
import Title from '../title'

const App = () => (
  <Container style={{ marginTop: '3em' }}>
    <Menu secondary>
      <Menu.Item as={Link} to={"/"}>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to={"/about-us"}>
        About
      </Menu.Item>
      <Menu.Item as={Link} to={"/titles"}>
        Titles
      </Menu.Item>
    </Menu>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/titles" component={Titles} />
      <Route exact path="/titles/:id" component={Title} />
    </main>
  </Container>
)

export default App
