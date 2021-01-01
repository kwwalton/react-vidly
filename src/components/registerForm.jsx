import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  }

  schema = {
    username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().required().label('Name'),
  }

  doSubmit = () => {
    // Call the server
    console.log('Registered')
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'email', true)}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name', 'text')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}

export default RegisterForm
