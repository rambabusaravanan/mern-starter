import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import User from './User'
import request from 'superagent';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    request.get('http://localhost:5000/api/user').then((res) => {
      console.log(res.body);
      this.setState({
        users: res.body
      })
    })
  }

  render() {

    const userList = this.state.users.map(user => <User name={user.name}></User>)

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {userList}
      </div>
    );
  }
}

export default App;
