// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, { Component } from 'react';

//Import components
import Products from './Products';
import Filter from './Filter';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import '../css/product/Allproducts.scss'

class ResetPassword extends Component {
  

  resetPassword = () => {
      const password = document.getElementById('password').value;
      const confirm_password = document.getElementById('confirm_password').value;
      const index = window.location.href.lastIndexOf('/') + 1;

      const token = window.location.href.substring(index);
      if (password !== confirm_password) {
        toast.error('Both password does not match');
      }
      else {
          axios.patch(`/reset_password/${token}`, {
              'password': password
          })
          .then((res) => { 
              window.location.href = '/'; 
          })
      }
  }


  render() {
    const index = window.location.href.lastIndexOf('/') + 1;

    const token = window.location.href.substring(index);

    axios.patch(`/reset_password/${token}`)
    .catch((err) => {
        toast.error('Token expired');
    })

    const user = global.auth.getUser();
    if (user) {
        window.location.href = '/';
    }

    return (
      <PageTemplate>
        <Form> 
            <ul>
                <li>
                    <label>Reset Password</label>
                </li>
                <li>
                    <label>Password</label>
                    <input id='password'></input>
                </li>
                <li>
                    <label>Confirm Password</label>
                    <input id='confirm_password'></input>
                </li>
                <li>
                    <button type='button' onClick={this.resetPassword}>Reset Password</button>
                </li>
            </ul>
        </Form>
      </PageTemplate>
    );
  }
}

export default ResetPassword;