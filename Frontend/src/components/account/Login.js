import React from 'react';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import {Nav, Row, Col} from 'react-bootstrap';
import axios from '../commons/axios';
import '../../css/account/Login.scss';
/************************************************************
              This is the Login component                       
 *************************************************************/

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
        toast.error("Login Failed. Wrong username or password.");
      }
    };
  
    return (
      <div className="login-container ">
        <div className="login-wrapper">
        <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
            <Nav className="justify-content-center title-container">
              <Nav.Link href="/" className="title">Sign In</Nav.Link>
            </Nav>
            <div className="config-email">
              <Row>
                <i class="fas fa-exclamation-triangle"></i>
                  <p class="has-text-danger"> If you are the first sign in please confirm your email before you sign in</p>
              </Row>
            </div>
            <div className="field-container">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
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

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
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
            <div className="footer-container text-center">
              <div className="foget-password">
             
                <Nav className="justify-content-center">
                    <Nav.Link href="/forget_password"> <i class="far fa-hand-point-right"></i> Forgot password</Nav.Link>
                </Nav>
              </div>              
              <button className="account-button">Login</button>
              <div className="footer-middle text-center">OR</div>
              <Nav className="justify-content-center">
                  <Nav.Link href="/register"><i class="fas fa-mouse-pointer"></i> Create account</Nav.Link>
              </Nav>
            </div>
          </form>
        </div>
      </div>
    );
  }
  