import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './select'

class Form extends Component {
  state = {
    data: {},
    errors: {},
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options)

    if (!error) return null

    const errors = {}
    error.details.map(err => (errors[err.path[0]] = err.message))
    return errors
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema)
    return error ? error.details[0].message : null
  }

  handleSubmit = e => {
    e.preventDefault()

    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return

    this.doSubmit()
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const data = { ...this.state.data }
    data[input.name] = input.value
    this.setState({ data, errors })
  }

  handleSelection = ({ target }) => {
    console.log(target.name, target.value)

    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(target)
    if (errorMessage) errors[target.name] = errorMessage
    else delete errors[target.name]

    const data = { ...this.state.data }
    data[target.name] = target.value
    this.setState({ data, errors })
  }

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    )
  }

  renderInput(name, label, type, autoFocus) {
    const { data, errors } = this.state
    return (
      <Input
        type={type}
        autoFocus={autoFocus}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  renderSelect(name, label, options, selectedItem) {
    const { errors } = this.state
    return (
      <Select
        name={name}
        label={label}
        options={options}
        onChange={this.handleSelection}
        error={errors[name]}
        selectedItem={selectedItem}
      />
    )
  }
}

export default Form
