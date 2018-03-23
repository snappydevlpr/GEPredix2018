import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
          <p1 className="App-title">user</p1>
        </header>
        <div class="icon-bar">
          <section className="App-SideMenu">
            <nav class = "sidebar">
              <a class = "App-SideBarButtons" >Item</a>
              <a class = "App-SideBarButtons" >Item</a>             
              <a class = "App-SideBarButtons" >Item</a>          
            </nav>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
