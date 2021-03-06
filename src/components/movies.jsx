import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getMovies, deleteMovie } from '../services/fakeMovieService'
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'
import ListGroup from './common/listGroup'
import { getGenres } from '../services/fakeGenreService'
import MoviesTable from './moviesTable'
import _ from 'lodash'
import Search from './common/search'

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
    searchTerm: ''
  }

  componentDidMount() {
    console.log('mounted')
    const genres = [{ name: 'All Genres' }, ...getGenres()]
    this.setState({
      movies: getMovies(),
      genres,
    })
  }

  handleDelete = movie => {
    deleteMovie(movie._id)
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies: movies })
  }

  handleLike = movie => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageChange = page => {
    console.log('Page Change', page)
    this.setState({ currentPage: page })
  }

  handleGenreSelect = genre => {
    const searchTerm = ''    
    this.setState({ searchTerm, selectedGenre: genre, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  handleSearch = (event) => {
    console.log('search', event.target.value)
    const searchTerm = event.target.value
    this.setState({ searchTerm, currentPage: 1})

    if (event.target.value > 0) {
      const selectedGenre = null
      this.setState({selectedGenre})
    }    
  }

  getPageData = () => {
    let filtered =
    this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(m => m.genre._id === this.state.selectedGenre._id)
        : this.state.movies

    filtered = this.state.searchTerm.length > 0
        ? this.state.movies.filter(m => m.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        : this.state.movies
    
    const sorted = _.orderBy(filtered, [this.state.sortColumn.path], [this.state.sortColumn.order])

    const movies = paginate(sorted, this.state.currentPage, this.state.pageSize)

    return { totalCount: filtered.length, data: movies}
  }

  render() {
    const { length: count } = this.state.movies
    const { pageSize, currentPage, sortColumn } = this.state

    if (count === 0) return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPageData()

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-9">
          <Link to="/movies/new" className="btn btn-sm btn-primary mb-3">New Movie</Link>
          <p>Showing {totalCount} movies in the database.</p>
          <Search value={this.state.searchTerm} onChange={this.handleSearch}/>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }

  createRows() {
    const movieList = this.state.movies
    movieList.map(movie => this.createRow(movie))
  }
}

export default Movies
