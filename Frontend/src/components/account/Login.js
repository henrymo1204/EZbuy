/**********************************************************
 * This is the page of Login 
 * User or seller can use the password and username login
 ***********************************************************/

import React from 'react';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import {Nav, Row} from 'react-bootstrap';
import axios from '../commons/axios';
import '../../css/account/Login.scss';


export default function Login(props) {
    const { register, handleSubmit, errors } = useForm();
  
    const onSubmit = async data => {
      // handle login
      try {
        const { username, password } = data;
        const res = await axios.post('/api/v1/login', { username, password });
        const jwToken = res.data['jwt_token'];
        console.log(jwToken);
        global.auth.setToken(jwToken);
        toast.success('Login Success');
        // route back to homepage
        props.history.push('/');
      } catch (error) {
        const message = error.response.data.message;
        toast.error("Login Failed.\nPlease make sure username or password are correct.");
        toast.error("First time login please make sure confirmed from registration email.");
      }
    };
  
    return (
      <div className="login-container ">
        <div className="login-wrapper">
        <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
            <Nav className="justify-content-center login-title-container">
              <Nav.Link href="/" className="login-title">Sign In</Nav.Link>
            </Nav>
            <div className="login-field-container">
              <div className="login-field">
                <label className="login-label">Username</label>
                <div className="login-control">
                  <input
                    className={`input ${errors.username && 'text-warn'}`}
                    type="text"
                    placeholder="Please enter username"
                    name="username"
                    ref={register({
                      required: 'username is required',
                      minLength: {
                        value: 6,
                        message: 'minimum length for username is 6'
                      }
                    })}
                  />
                  {errors.username && (
                    <p className="helper has-text-danger">{errors.username.message}</p>
                  )}
                </div>
              </div>

              <div className="login-field password-field">
                <label className="login-label">Password</label>
                <div className="login-control">
                  <input
                    className={`input ${errors.password && 'text-warn'}`}
                    type="password"
                    placeholder="Please enter Password"
                    name="password"
                    ref={register({
                      required: 'password is required',
                      minLength: {
                        value: 6,
                        message: 'minimum length for password is 6'
                      }
                    })}
                  />
                  {errors.password && (
                    <p className="helper has-text-danger">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="login-footer-container text-center">
              <button className="login-account-button">Login</button>
              <div className="login-footer-middle text-center">OR</div>
              <Nav className="justify-content-center">
                  <Nav.Link href="/register"><i className="fas fa-mouse-pointer"></i> Create account</Nav.Link>
              </Nav>
              <div className="foget-password">
                <Nav className="justify-content-center">
                    <Nav.Link href="/forget_password"> <i className="far fa-hand-point-right"></i> Forgot password</Nav.Link>
                </Nav>
              </div>     
            </div>
          </form>
        </div>
      </div>
    );
  }
  