import React from 'react'
import Form from './common/form'
import Joi from 'joi-browser'
import { getGenres } from '../services/fakeGenreService'
import { saveMovie } from '../services/fakeMovieService'
import { getMovie } from '../services/fakeMovieService'
// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>Movie Form {match.params.id}</h1>
//       {/* <button className="btn btn-sm btn-primary"onClick={() => history.push('/movies')}>Save</button> */}
//     </div>
//   )
// }

class MovieForm extends Form {
  state = {
    data: { title: '', genre: '', number: '', rate: '', id: null},
    errors: {},
    genres: [],
    isEditMode: false,
  }

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    number: Joi.number().required().min(0).max(100),
    rate: Joi.number().required().min(0).max(10),
    id: Joi.any()
  }

  componentDidMount() {
    this.createOrEdit()
    const genres = [...getGenres()]
    this.setState({
      genres,
    })
  }

  createOrEdit() {
    const { id } = this.props.match.params
    const isEditMode = (id === 'new') ? false : true
    this.setState({isEditMode: isEditMode})
    if (isEditMode) {
      this.editModeConfirmRoute(id)
    }
  }

  editModeConfirmRoute(id) {
    const movie = getMovie(id)
    if (movie === undefined) {
      this.props.history.replace('/not-found')
    } else {
      this.populateData(movie)
    }
  }

  populateData(movie) {
    const data = {...this.state.data}
    data.title = movie.title
    data.genre = movie.genre.name
    data.number = movie.numberInStock
    data.rate = movie.dailyRentalRate
    data.id = movie._id
    this.setState({data})
  }

  doSubmit = () => {
    // Call the server
    //console.log('Saved')
    //console.table(this.state.data)

    const genreMatch = this.state.genres.find(genre=> genre.name===this.state.data.genre)

    let payload = {
      title: this.state.data.title,
      genreId: genreMatch._id,
      numberInStock: parseInt(this.state.data.number),
      dailyRentalRate: parseFloat(this.state.data.rate),
    }

    if (!this.state.isEditMode) {
      payload.publishDate = new Date().toISOString()
    } else {
      payload._id = this.state.data.id
    }

    saveMovie(payload)
    this.props.history.push('/movies')
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title', 'text', true)}
          {this.renderSelect('genre', 'Genre', this.state.genres, this.state.data.genre)}
          {this.renderInput('number', 'Number In Stock', 'text')}
          {this.renderInput('rate', 'Daily Rental Rate', 'text')}
          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}

export default MovieForm
