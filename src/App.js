import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);  
    this.state = {};  
    // const movies = [
    //   {id: 0, 
    //     img_src:'https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_.jpg',
    //     title:'Iron Man', 
    //     overview:'With the world now aware of his identity as Iron Man, Tony Stark must contend with both his declining health and a vengeful mad man with ties to his father\'s legacy.'
    //   },
    //   {id: 1,
    //     img_src:'https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    //     title:'Thor', 
    //     overview:'When Dr. Jane Foster gets cursed with a powerful entity known as the Aether, Thor is heralded of the cosmic event known as the Convergence and the genocidal Dark Elves.'
    //   }
    // ]
    // var movieRows = [];
    // movies.forEach(movie => {
    //   console.log(movie.title);
    //   const movieRow = <MovieRow key={movie.id} movie={movie} />
    //   movieRows.push(movieRow)
    // });
    // this.state = {
    //   rows: movieRows
    // }
    this.performSearch('woman');
  }

  performSearch = (searchInput) => {
    console.log('.|. performSearch');
    const url = `http://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=18dcbd306a4898cdd190569fbce3c29f`;
    $.ajax({
      url: url,
      success: (result) => {
        //console.table(result, ['original_title', 'popularity']);
        const results = result.results;
        let movieRows = []
        results.forEach(movie => {
          movie.img_src = (`https://image.tmdb.org/t/p/w185/${movie.poster_path}`); 
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow)
        });
        this.setState({rows: movieRows});
      },
      error: (xhr, status, err) => {
        console.log('Error');
      }
    })
  }

  inputHandler = (event) => {
    console.log(event.target.value);
    const search = event.target.value;
    this.performSearch(search);
  }

  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt='app icon' width="50" src="icon.png" />
              </td>
              <td>
                <h1>IMDB Search movies</h1>
              </td>
            </tr>
          </tbody>
        </table>
        <input style = {{
          fontSize: 24,
          display: 'block',
          width: '100%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.inputHandler} placeholder="Enter movie" />

        {this.state.rows}
      </div>
    );
  }
}

export default App;
