import React, { Component } from 'react'
import Input from './common/input'

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {},
  }

  // username = React.createRef()

  // componentDidMount() {
  //   //this.username.current.focus()
  // }

  validate = () => {
    const errors = {}
    const { account } = this.state
    if (account.username.trim() === '')
      errors.username = 'Username is required.'
    if (account.password.trim() === '')
      errors.password = 'Password is required.'

    return Object.keys(errors).length === 0 ? null : errors
  }

  handleSubmit = e => {
    e.preventDefault()

    const errors = this.validate()
    console.log(errors)
    this.setState({ errors: errors || {} })
    //const username = this.username.current.value
    //console.log('submitted', username)
  }

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account }
    account[input.name] = input.value
    this.setState({ account })
  }

  render() {
    const { account, errors } = this.state
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus={true}
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm