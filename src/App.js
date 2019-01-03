import React, { Component } from 'react';
import './App.css';
import Movie from './Movie.js';



class App extends Component {

  // Render : componentWillMount() -> render() -> componentDidMount()
  // Update : componentWillReceiveProps() -> shouldComponenetUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  // state가 바뀔때마다 render함수 발생
  // state를 바꾸려면 무조건 thi.setState로 접근

  state = {};

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
  };

  _callApi = () => {
    return fetch(
      "https://yts.am/api/v2/list_movies.json?sort_by=download_count"
    )
      .then(potato => potato.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading...."}
      </div>
    );
  }
}

export default App;

//JSON = JavaScript Object Notation
//Ajax는 url을 자바스크립트로 asynchronous(비동기화)방법으로 불러옵니다.