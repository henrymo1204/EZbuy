import React from 'react';
import {useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from '../commons/axios';
import '../../css/account/Login.scss'

export default function Login(props) {
    const { register, handleSubmit, errors } = useForm();
  
    const onSubmit = async data => {
      // handle login
      try {
        const { username, password } = data;
        const res = await axios.post('/login', { username, password });
        const jwToken = res.data['jwt_token'];
        console.log(jwToken);
        global.auth.setToken(jwToken);
        toast.success('Login Success');
        // route back to homepage
        props.history.push('/');
      } catch (error) {
        const message = error.response.data.message;
        toast.error(message);
      }
    };
  
    return (
      <div className="login-wrapper">
        <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className={`input ${errors.username && 'text-warn'}`}
                type="text"
                placeholder="Username"
                name="username"
                ref={register({
                  required: 'username is required',
                  minLength: {
                    value: 6,
                    message: 'cannot be less than 6 digits'
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
                placeholder="Password"
                name="password"
                ref={register({
                  required: 'password is required',
                  minLength: {
                    value: 6,
                    message: 'cannot be less than 6 digits'
                  }
                })}
              />
              {errors.password && (
                <p className="helper has-text-danger">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="control">
            <button className="button is-fullwidth is-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
  