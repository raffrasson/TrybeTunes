import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      isLoading: false,
      api: '',
    };
  }

  componentDidMount() {
    this.fetchAddSong();
  }

  fetchAddSong = () => {
    const { songObj } = this.props;
    this.setState({ isLoading: true }, async () => {
      const fetchApi = await addSong(songObj);
      this.setState({ api: fetchApi, isLoading: false });
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
      isLoading: true,
    });
    this.fetchAddSong();
  }

favoriteSong = () => {
  const { trackId } = this.props;
  const { isFavorite } = this.state;
  return (
    <label htmlFor="isFavorite">
      Favorita
      <input
        name="isFavorite"
        type="checkbox"
        data-testid={ `checkbox-music-${trackId}` }
        checked={ isFavorite }
        onChange={ this.handleChange }
      />
    </label>
  );
}

render() {
  const { isLoading, api } = this.state;
  const { trackName, previewUrl } = this.props;
  console.log(api); // pra passar pelo lint, já que é usada apenas nos outros requisitos
  if (isLoading === true) {
    return <Loading />;
  }
  return (
    <div>
      <div key={ trackName }>
        <p>
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code />
        </audio>
      </div>
      {this.favoriteSong()}
    </div>);
}
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  songObj: PropTypes.string.isRequired,
};

export default MusicCard;
