import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artist } = this.state;
    const two = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist">
            <input
              name="artist"
              type="text"
              data-testid="search-artist-input"
              value={ artist }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ artist.length < two }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
