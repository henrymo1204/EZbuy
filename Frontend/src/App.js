// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import Button from 'react-bootstrap/Button';
import React from 'react';
import Homepage from './components/Homepage';
import MyNavbar from './components/Navbar';
import UserProfile from './components/account/UserProfile'
import { Component, useMemo} from 'react';
import './App.css';

const welcome = {
  greeting: 'Hey',
  title: 'EZ Buy',
};

const App = props => {

    const user = useMemo(() => {
      return global.auth.getUser() || {};
    }, []);

    return (
      <div>
        {/* <h1>{welcome.greeting} {welcome.title}</h1>

        <button class="btn btn-default">
          <img src="/images/ez_buy_logo.jpg" width="20" />y_Logo_Home
    </button>*/}

        <img className="ezbuy_logo" src="/images/ez_buy_logo.jpg" alt="" />

        <MyNavbar user={user}/>

        {/*<label htmlFor="search">Search: </label>
        <input id="search" type="text" />

        <button type="submit" class="btn btn-default">Submit</button> */}
      </div>
    );
}


export default App;
